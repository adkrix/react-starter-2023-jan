/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env';
import { TLoginForm, TLoginResponse, TUserResponse } from 'features/auth/types';
import makeApi from 'libs/core/configureAxios';

const api = makeApi(`${Env.API_BASE_URL}/api`);

const LOGIN_BASE_URL = `/auth/local`;
const USER_BASE_URL = `/users/me`;

export const login = (loginRequest: TLoginForm): Promise<TLoginResponse> =>
  api.post(LOGIN_BASE_URL, loginRequest);

export const usersMe = (): Promise<TUserResponse> => api.post(USER_BASE_URL);
