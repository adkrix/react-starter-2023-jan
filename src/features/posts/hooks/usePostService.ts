import { useCallback } from 'react';

import {
  postsActions,
  selectItems,
  selectIsCreating,
  selectDeleting,
  selectUpdating,
  selectIsLoading,
  selectError,
} from 'features/posts/store';
import { Post, PostAttributes } from 'features/posts/types';
import { TIdKey } from 'libs/redux';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export type PostServiceOperators = {
  items: Post[];
  isLoading: boolean;
  isCreating: boolean;
  deleting: TIdKey[];
  updating: TIdKey[];
  error: string;
  createPost: (data: PostAttributes) => void;
  fetchAllPosts: () => void;
  deletePost: (post: Post) => void;
  updatePost: (post: Post) => void;
};

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const usePostService = (): Readonly<PostServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    items: useAppSelector(selectItems),
    error: useAppSelector(selectError),

    isLoading: useAppSelector(selectIsLoading),
    isCreating: useAppSelector(selectIsCreating),
    updating: useAppSelector(selectUpdating),
    deleting: useAppSelector(selectDeleting),

    createPost: useCallback(
      (post: PostAttributes) => {
        dispatch(postsActions.create({ title: post.title, description: post.description, content: post.content }));
      },
      [dispatch],
    ),

    fetchAllPosts: useCallback(() => {
      dispatch(postsActions.fetchAll());
    }, [dispatch]),

    deletePost: useCallback(
      (post: Post) => {
        dispatch(postsActions.delete(post));
      },
      [dispatch],
    ),

    updatePost: useCallback(
      (post: Post) => {
        dispatch(
          postsActions.update({
            ...post,
            attributes: {
              ...post.attributes,
              description: `Description ${new Date().getMilliseconds()}`,
              content: `Updated at ${new Date().toISOString()}`,
            },
          }),
        );
      },
      [dispatch],
    ),
  };
};

export default usePostService;
