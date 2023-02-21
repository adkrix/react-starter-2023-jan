import { Container } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { PostsContainer } from 'features/posts/components/PostsContainer';

export default {
  title: 'features/components/posts/PostContainer',
  component: PostsContainer,
  decorators: [
    Story => (
      <Container sx={{ py: 4 }} maxWidth="md">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof PostsContainer>;

const Template: ComponentStory<typeof PostsContainer> = () => <PostsContainer />;

export const Primary = Template.bind({});
