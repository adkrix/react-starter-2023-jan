/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env';
import { LoginFormInput, LoginResponse } from 'features/auth/types';
import makeApi from 'libs/core/configureAxios';

const api = makeApi(`${Env.API_BASE_URL}/api/auth`);

const LOGIN_BASE_URL = `/local`;

export const login = (loginRequest: LoginFormInput): Promise<LoginResponse> =>
  api.post(LOGIN_BASE_URL, loginRequest);
