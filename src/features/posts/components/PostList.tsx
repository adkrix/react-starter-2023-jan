import { Grid } from '@mui/material';
import React from 'react';

import PostCardView from 'features/posts/components/PostCardView';
import { Post } from 'features/posts/types';
import { TIdKey } from 'libs/redux';

export type PostListProps = {
  posts: Post[];
  onDeletePost: (post: Post) => void;
  onUpdatePost: (post: Post) => void;
  deleting: TIdKey[];
  updating: TIdKey[];
};

export const PostList = (props: PostListProps) => {
  const { posts, onDeletePost, onUpdatePost, deleting, updating } = props;

  return (
    <>
      <Grid container>
        {posts.map(post => (
          <PostCardView
            data-test-id={post.attributes.title}
            key={post.id}
            post={post}
            onDeleteClick={onDeletePost}
            onUpdateClick={onUpdatePost}
            isDeleting={deleting.includes(post.id)}
            isUpdating={updating.includes(post.id)}
          />
        ))}
      </Grid>
    </>
  );
};
