import { all, fork } from 'redux-saga/effects';

import { authWatcherSaga } from 'features/auth/store/auth.sagas';
import { postsWatcherSaga } from 'features/posts/store/posts.sagas';

export function* rootSaga() {
  yield all([fork(authWatcherSaga), fork(postsWatcherSaga)]);
}

export default rootSaga;
