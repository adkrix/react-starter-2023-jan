import { CircularProgress, Container } from '@mui/material';
import React, { useEffect } from 'react';

import PostForm from 'features/posts/components/PostForm';
import { PostList } from 'features/posts/components/PostList';
import { usePostService } from 'features/posts/hooks/usePostService';

export const PostsContainer = () => {
  const {
    items,
    deletePost,
    updatePost,
    fetchAllPosts,
    createPost,
    isCreating,
    isLoading,
    deleting,
    updating,
  } = usePostService();

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);
  return (
    <>
      <Container maxWidth="xs">
        <PostForm onSubmitClick={createPost} isCreating={isCreating} />
      </Container>
      <Container
        sx={{
          py: 4,
          position: 'relative',
          opacity: isLoading ? 0.5 : 1,
        }}
        maxWidth="md"
      >
        {isLoading && (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: items.length ? '50%' : 40,
              marginTop: items.length ? '-20px' : 0,
              left: '50%',
              marginLeft: '-20px',
            }}
            size={40}
          />
        )}
        <PostList
          posts={items}
          onDeletePost={deletePost}
          onUpdatePost={updatePost}
          deleting={deleting}
          updating={updating}
        />
      </Container>
    </>
  );
};
