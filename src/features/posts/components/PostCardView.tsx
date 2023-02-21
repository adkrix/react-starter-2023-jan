import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, Grid, IconButton, Paper } from '@mui/material';
import React from 'react';

import { Post } from 'features/posts/types';

const styles = {
  Icon: {
    marginLeft: 'auto',
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
};

export type PostCardViewProps = {
  post: Post;
  isDeleting: boolean;
  isUpdating: boolean;
  onDeleteClick: (post: Post) => void;
  onUpdateClick: (post: Post) => void;
};

const PostCardView = (props: PostCardViewProps) => {
  const { post, isDeleting, isUpdating, onDeleteClick, onUpdateClick } = props;

  const handleDeleteClick = () => {
    onDeleteClick(post);
  };

  const handleUpdateClick = () => onUpdateClick(post);

  return (
    <>
      <Grid xs={12} item key={post.id}>
        <Paper elevation={2} style={styles.Paper}>
          <span>
            <strong>{post.attributes.title}</strong> - {post.attributes.description}
            <br />
            {post.attributes.content}
          </span>
          <br />
          <IconButton
            color="primary"
            aria-label="Edit"
            style={styles.Icon}
            onClick={handleUpdateClick}
            disabled={isUpdating || isDeleting}
          >
            {isUpdating ? <CircularProgress size={24} /> : <EditIcon />}
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={handleDeleteClick}
            disabled={isUpdating || isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : <DeleteForeverIcon />}
          </IconButton>
        </Paper>
      </Grid>
    </>
  );
};
export default PostCardView;
