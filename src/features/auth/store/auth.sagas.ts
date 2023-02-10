import { SagaIterator } from '@redux-saga/core';
import { call, takeEvery } from 'redux-saga/effects';

import { login } from 'features/auth/api';
import { authActions } from 'features/auth/store/auth.slice';
import { LoginFormInput } from 'features/auth/types';

type CreatePostType = {
  type: typeof authActions.login;
  payload: LoginFormInput;
};

// Worker Sagas
function* onCreateLogin({ payload }: CreatePostType): SagaIterator {
  yield call(login, payload);
  // yield put(postsActions.fetchAll());
  // reload app with
}

// Watcher Saga
export function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authActions.login.type, onCreateLogin);
}

export default authWatcherSaga;
