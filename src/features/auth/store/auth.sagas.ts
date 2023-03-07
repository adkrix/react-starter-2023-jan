import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import store from 'store2';

import { login, usersMe } from 'features/auth/api';
import { STORE_JWT_KEY } from 'features/auth/constants';
import { authActions as actions } from 'features/auth/store/auth.slice';
import { TLoginForm } from 'features/auth/types';
import { TAuthResponse, TUser, createFailedResponse } from 'libs/core/api';

type CreatePostType = {
  type: typeof actions.login;
  payload: TLoginForm;
};

// Worker Sagas
function* onCreateLogin({ payload }: CreatePostType): SagaIterator {
  try {
    const data: TAuthResponse<TUser> = yield call(login, payload);
    store({ [STORE_JWT_KEY]: data.jwt });
    yield put(actions.loginSucceeded(data));
  } catch (e) {
    yield put(actions.loginFailed(createFailedResponse(e, {})));
  }
}

function* onRestoreUser(): SagaIterator {
  try {
    const jwt = store.get(STORE_JWT_KEY);
    const user = yield call(usersMe);
    yield put(actions.loginSucceeded({ user, jwt }));
  } catch (e) {
    yield put(actions.loginFailed(createFailedResponse(e, {})));
    yield put(actions.logout());
  }
}

function* onRemoveLogin(): SagaIterator {
  store.remove(STORE_JWT_KEY);
  yield put(actions.logout());
}

// Watcher Saga
export function* authWatcherSaga(): SagaIterator {
  yield takeEvery(actions.login.type, onCreateLogin);
  yield takeEvery(actions.logout.type, onRemoveLogin);
  yield takeEvery(actions.restoreUser.type, onRestoreUser);
}

export default authWatcherSaga;
