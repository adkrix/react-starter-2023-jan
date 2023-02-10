/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env';
import { Post, PostAttributes } from 'features/posts/types';
import { SucceededResponse } from 'libs/core/api';
import makeApi from 'libs/core/configureAxios';

const api = makeApi(`${Env.API_BASE_URL}`);

const POSTS_BASE_URL = `/api/posts`;

export const getPosts = (): Promise<SucceededResponse<Post[]>> => api.get(POSTS_BASE_URL);

export const createPost = (post: PostAttributes): Promise<SucceededResponse<Post>> =>
  api.post(POSTS_BASE_URL, post);

export const updatePost = (post: Post): Promise<SucceededResponse<Post>> =>
  api.put(`${POSTS_BASE_URL}/${post.id}`, post);

export const deletePost = (post: Post): Promise<SucceededResponse<Post>> =>
  api.delete(`${POSTS_BASE_URL}/${post.id}`, { data: post });
