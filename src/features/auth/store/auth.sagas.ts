import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';

import { login } from 'features/auth/api';
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
    yield put(actions.loginSucceeded(data));
  } catch (e) {
    yield put(actions.loginFailed(createFailedResponse(e, {})));
  }

  // yield put(postsActions.fetchAll());
  // reload app with
}

// Watcher Saga
export function* authWatcherSaga(): SagaIterator {
  yield takeEvery(actions.login.type, onCreateLogin);
}

export default authWatcherSaga;
