/* eslint-disable @typescript-eslint/no-explicit-any */

import { nanoid } from '@reduxjs/toolkit';
import { rest } from 'msw';

import Env from 'config/Env';
import { Post } from 'features/posts';
import { db, persistDb } from 'test/msw/db';
import { errorFormat, responseFormat, sleep } from 'test/msw/default';

const BASE_URL = `${Env.API_BASE_URL}/api/posts`;
const WAIT_PERIOD = 700;

export const postsHandlers = [
  rest.get(BASE_URL, async (req, res, ctx) => {
    try {
      await sleep(WAIT_PERIOD);
      if (Math.random() > 0.9) {
        throw Error('DB error');
      }
      const result = db.posts.getAll();
      return res(ctx.json(responseFormat(result)));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json(errorFormat(error?.message)));
    }
  }),

  rest.get(`${BASE_URL}/:postId`, async (req, res, ctx) => {
    try {
      await sleep(WAIT_PERIOD);
      if (Math.random() > 0.9) {
        throw Error('DB error');
      }
      const { postId } = req.params;
      const result = db.posts.findFirst({
        where: {
          id: {
            equals: postId,
          },
        },
      });
      return res(ctx.json(responseFormat(result)));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json(errorFormat(error?.message)));
    }
  }),

  rest.post<Post>(BASE_URL, async (req, res, ctx) => {
    try {
      await sleep(WAIT_PERIOD);
      if (Math.random() > 0.9) {
        throw Error('DB error');
      }
      const attributes = await req.json();
      const result = db.posts.create({
        id: nanoid(),
        attributes,
      });
      persistDb('posts');
      return res(ctx.json(responseFormat(result)));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json(errorFormat(error?.message)));
    }
  }),

  rest.put<Post>(`${BASE_URL}/:postId`, async (req, res, ctx) => {
    try {
      await sleep(WAIT_PERIOD);
      if (Math.random() > 0.9) {
        throw Error('DB error');
      }
      const data = await req.json();
      const { postId } = req.params;
      const result = db.posts.update({
        where: {
          id: {
            equals: postId,
          },
        },
        data,
      });
      persistDb('posts');
      return res(ctx.json(responseFormat(result)));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json(errorFormat(error?.message)));
    }
  }),

  rest.delete<Post>(`${BASE_URL}/:postId`, async (req, res, ctx) => {
    try {
      await sleep(WAIT_PERIOD);
      if (Math.random() > 0.9) {
        throw Error('DB error');
      }
      const { postId } = req.params;
      const result = db.posts.delete({
        where: {
          id: {
            equals: postId,
          },
        },
      });
      persistDb('posts');
      return res(ctx.json(responseFormat(result)));
    } catch (error: any) {
      return res(ctx.status(400), ctx.json(errorFormat(error?.message)));
    }
  }),
];
