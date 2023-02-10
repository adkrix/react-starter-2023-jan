import { nanoid } from '@reduxjs/toolkit';
import { rest } from 'msw';

import Env from 'config/Env';
import { LoginFormInput, LoginResponse } from 'features/auth';
import { db, persistDb } from 'test/msw/db';
import { defaultUserEmail, defaultUserPassword } from 'test/msw/default';

// const BASE_URL = `${Env.API_BASE_URL}/login`;
const BASE_URL = `${Env.API_BASE_URL}/api/auth`;
const LOGIN_URL = `${BASE_URL}/local`;

export const authHandlers = [
  rest.post<LoginFormInput>(LOGIN_URL, async (req, res, ctx) => {
    const { identifier, password } = await req.json();

    if (identifier === defaultUserEmail && password === defaultUserPassword) {
      const loggedData: LoginResponse = {
        jwt: nanoid(),
        user: {
          id: 1,
          email: identifier,
          username: 'editor',
        },
      };
      const result = db.logins.create(loggedData);
      persistDb('logins');
      return res(ctx.json(result));
    }
    const message = 'Wrong identifier or password';
    return res(ctx.status(400), ctx.json({ message }));
  }),
];
