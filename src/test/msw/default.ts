import { FailedResponse, SucceededResponse } from 'libs/core/api';

export const defaultUserEmail = 'editor@example.com';
export const defaultUserPassword = 'password';

export function responseFormat<T>(data: T): SucceededResponse<T> {
  return { data, meta: {} };
}

export function errorFormat(message = 'Server error', status = 400): FailedResponse {
  return { data: null, error: { status, message, name: 'Error', details: {} } };
}

export function sleep(ms: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });
}
