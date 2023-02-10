import { TIdKey } from 'libs/redux';

export type PostAttributes = {
  title: string;
  description: string;
  content: string;
};

export type Post = {
  id: TIdKey;
  attributes: PostAttributes;
};
