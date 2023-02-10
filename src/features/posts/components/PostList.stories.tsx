import { Container } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { PostList } from 'features/posts/components/PostList';

export default {
  title: 'features/components/posts/PostList',
  component: PostList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
    Story => (
      <Container sx={{ py: 4 }} maxWidth="md">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof PostList>;

const Template: ComponentStory<typeof PostList> = args => <PostList {...args} />;

export const OneItem = Template.bind({});
OneItem.args = {
  posts: [
    {
      id: '62219db8-1d5b-4544-bfd0-e12239c2a37e',
      attributes: { title: 'StoryBook 1', description: 'Description 1', content: 'Content 1' },
    },
  ],
};

export const MultipleItems = Template.bind({});
MultipleItems.args = {
  posts: [
    {
      id: '62219db8-1d5b-4544-bfd0-e12239c2a37e',
      attributes: { title: 'StoryBook 1', description: 'Description 1', content: 'Content 1' },
    },
    {
      id: '3c46f121-445d-41aa-a290-25b5fe03f461',
      attributes: { title: 'StoryBook 2', description: 'Description 2', content: 'Content 2' },
    },
    {
      id: '3c46f121-445d-41aa-a290-25b5fe03f463',
      attributes: { title: 'StoryBook 3', description: 'Description 3', content: 'Content 3' },
    },
    {
      id: '3c46f121-445d-41aa-a290-25b5fe03f465',
      attributes: { title: 'StoryBook 4', description: 'Description 4', content: 'Content 4' },
    },
    {
      id: '3c46f121-445d-41aa-a290-25b5fe03f467',
      attributes: { title: 'StoryBook 5', description: 'Description 5', content: 'Description 5' },
    },
    {
      id: '3c46f121-445d-41aa-a290-25b5fe03f469',
      attributes: { title: 'StoryBook 6', description: 'Description 5', content: 'Description 6' },
    },
  ],
};
