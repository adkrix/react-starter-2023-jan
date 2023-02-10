import { AxiosError } from 'axios';

import { TIdKey } from 'libs/redux';
// API

export type SucceededResponse<T> = {
  data: T;
  meta: unknown;
};

export type FailedResponse = {
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

export function createFailedResponse(e: unknown, data: { id?: TIdKey } = {}): FailedResponse {
  const error = (e as AxiosError).response?.data as FailedResponse;
  return { error: error.error, data };
}

// Auth
export type AuthResponse<T> = {
  jwt: string;
  user: T;
};

export type User = {
  id: number;
  email: string | null;
  username: string | null;
};

export const defaultUser = (): User => ({
  id: 0,
  username: null,
  email: null,
});
