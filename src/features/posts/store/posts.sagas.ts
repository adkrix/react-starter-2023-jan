import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';

import { createPost, deletePost, getPosts, updatePost } from 'features/posts/api';
import { postsActions as actions } from 'features/posts/store/posts.slice';
import { Post, PostAttributes } from 'features/posts/types';
import { createFailedResponse, TSucceededResponse } from 'libs/core/api';

type CreatePostType = {
  type: typeof actions.create;
  payload: PostAttributes;
};
type UpdatePostType = {
  type: typeof actions.update;
  payload: Post;
};
type DeletePostType = {
  type: typeof actions.update;
  payload: Post;
};

// Worker Sagas
export function* onGetPosts(): SagaIterator {
  try {
    const posts: TSucceededResponse<Post[]> = yield call(getPosts);
    yield put(actions.fetchAllSucceeded(posts));
  } catch (e: unknown) {
    yield put(actions.fetchAllFailed(createFailedResponse(e)));
  }
}

function* onCreatePost({ payload }: CreatePostType): SagaIterator {
  try {
    yield call(createPost, payload);
    yield put(actions.createSucceeded());
  } catch (e) {
    yield put(actions.createFailed(createFailedResponse(e)));
    return;
  }
  yield put(actions.fetchAll());
}

function* onUpdatePost({ payload }: UpdatePostType): SagaIterator {
  try {
    const post: TSucceededResponse<Post> = yield call(updatePost, payload);
    yield put(actions.updateSucceeded(post));
  } catch (e) {
    yield put(actions.updateFailed(createFailedResponse(e, { id: payload.id })));
  }
}

function* onDeletePost({ payload }: DeletePostType): SagaIterator {
  try {
    const post: TSucceededResponse<Post> = yield call(deletePost, payload);
    yield put(actions.deleteSucceeded(post));
  } catch (e) {
    yield put(actions.deleteFailed(createFailedResponse(e, { id: payload.id })));
  }
}

// Watcher Saga
export function* postsWatcherSaga(): SagaIterator {
  yield takeEvery(actions.fetchAll.type, onGetPosts);
  yield takeEvery(actions.update.type, onUpdatePost);
  yield takeEvery(actions.delete.type, onDeletePost);
  yield takeEvery(actions.create.type, onCreatePost);
}

export default postsWatcherSaga;
