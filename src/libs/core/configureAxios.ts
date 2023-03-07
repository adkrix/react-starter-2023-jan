import axios from 'axios';
import store from 'store2';

import { STORE_JWT_KEY } from 'features/auth/constants';

export default function makeApi(baseURL: string) {
  const api = axios.create({
    baseURL,
  });

  api.defaults.headers.post['Content-Type'] = 'application/json';
  api.defaults.headers.put['Content-Type'] = 'application/json';
  api.defaults.headers.delete['Content-Type'] = 'application/json';

  api.interceptors.request.use(
    config => {
      const jwt = store.get(STORE_JWT_KEY);
      if (jwt) {
        // @ts-ignore
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwt}`,
        };
      }

      return config;
    },
    error => Promise.reject(error),
  );

  api.interceptors.response.use(
    response => response.data, // return data object
    error => Promise.reject(error),
  );
  return api;
}
