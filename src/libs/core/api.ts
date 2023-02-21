import { AxiosError } from 'axios';

import { TIdKey } from 'libs/redux';
// API

export type TSucceededResponse<T> = {
  data: T;
  meta: unknown;
};

export type TFailedResponse = {
  data?: null | {
    id?: TIdKey;
  };
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
};

export function createFailedResponse(e: unknown, data: { id?: TIdKey } = {}): TFailedResponse {
  const error = (e as AxiosError).response?.data as TFailedResponse;
  return { error: error.error, data };
}

// Auth
export type TAuthResponse<T> = {
  jwt: string;
  user: T;
};

export type TUser = {
  id: number;
  email: string | null;
  username: string | null;
};

export const defaultUser = (): TUser => ({
  id: 0,
  username: null,
  email: null,
});
