// DUCKS pattern
import { createAction, createSlice } from '@reduxjs/toolkit';

import { Post, PostAttributes } from 'features/posts/types';
import { TIdMap, TList, getListKit, TCrudState, getCrudKit } from 'libs/redux';
import type { RootState } from 'store/store';

const list = getListKit<Post>();
const crud = getCrudKit<Post>();

export type PostsState = TList<Post> & TCrudState<Post>;
export const initPostState = (): PostsState => ({
  ...list.state(),
  ...crud.creating.state(),
  ...crud.reading.state(),
  ...crud.updating.state(),
  ...crud.deleting.state(),
});

// slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState: initPostState(),
  reducers: {
    fetchAll: list.request,
    fetchAllSucceeded: list.succeeded,
    fetchAllFailed: list.failed,
    create: crud.creating.request,
    createSucceeded: crud.creating.succeeded,
    createFailed: crud.creating.failed,
    fetch: crud.reading.request,
    fetchSucceeded: crud.reading.succeeded,
    fetchFailed: crud.reading.failed,
    update: crud.updating.request,
    updateSucceeded: crud.updating.succeeded,
    updateFailed: crud.updating.failed,
    delete: crud.deleting.request,
    deleteSucceeded: crud.deleting.succeeded,
    deleteFailed: crud.deleting.failed,
  },
});

// Actions
export const postsActions = {
  fetchAll: postsSlice.actions.fetchAll,
  fetchAllSucceeded: postsSlice.actions.fetchAllSucceeded,
  fetchAllFailed: postsSlice.actions.fetchAllFailed,

  // fetch: postsSlice.actions.fetch,
  fetch: createAction<TIdMap>(`${postsSlice.name}/fetch`),
  fetchSucceeded: postsSlice.actions.fetchSucceeded,
  fetchFailed: postsSlice.actions.fetchFailed,

  create: createAction<PostAttributes>(`${postsSlice.name}/create`),
  createSucceeded: postsSlice.actions.createSucceeded,
  createFailed: postsSlice.actions.createFailed,

  update: createAction<Post>(`${postsSlice.name}/update`),
  updateSucceeded: postsSlice.actions.updateSucceeded,
  updateFailed: postsSlice.actions.updateFailed,

  delete: createAction<TIdMap>(`${postsSlice.name}/delete`),
  deleteSucceeded: postsSlice.actions.deleteSucceeded,
  deleteFailed: postsSlice.actions.deleteFailed,
};

// Selectors
export const selectItems = (state: RootState) => state.posts.items;
export const selectError = (state: RootState) => state.posts.error;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;

export const selectIsCreating = (state: RootState) => state.posts.isCreating;
export const selectCreatingError = (state: RootState) => state.posts.creatingError;

export const selectItem = (state: RootState) => state.posts.item;
export const selectIsReading = (state: RootState) => state.posts.isReading;
export const selectReadingError = (state: RootState) => state.posts.readingError;

export const selectUpdating = (state: RootState) => state.posts.updating;
export const selectUpdatingErrors = (state: RootState) => state.posts.updatingErrors;

export const selectDeleting = (state: RootState) => state.posts.deleting;
export const selectDeletingErrors = (state: RootState) => state.posts.deletingErrors;

// Reducer
export default postsSlice.reducer;
