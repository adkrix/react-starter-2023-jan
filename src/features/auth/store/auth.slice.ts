import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TLoginResponse, TLoginForm } from 'features/auth/types';
import { TFailedResponse, defaultUser } from 'libs/core/api';
import type { RootState } from 'store/store';

export type AuthState = TLoginResponse & {
  isLoading: boolean;
  error: string;
};

export const initAuthState = (): AuthState => ({
  jwt: '',
  user: defaultUser(),
  isLoading: false,
  error: '',
});

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState(),
  reducers: {
    login(state) {
      state.error = '';
      state.isLoading = true;
    },
    loginSucceeded(state, action: PayloadAction<TLoginResponse>) {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
      state.error = '';
      state.isLoading = false;
    },
    loginFailed(state, action: PayloadAction<TFailedResponse>) {
      state.jwt = '';
      state.user = defaultUser();
      state.error = action.payload.error.message;
      state.isLoading = false;
    },
    logout(state) {
      state.jwt = '';
      state.user = defaultUser();
      state.error = '';
      state.isLoading = false;
    },
  },
});

// Actions
export const authActions = {
  login: createAction<TLoginForm>(`${authSlice.name}/login`),
  loginSucceeded: authSlice.actions.loginSucceeded,
  loginFailed: authSlice.actions.loginFailed,
  logout: createAction(`${authSlice.name}/logout`),
  restoreUser: createAction(`${authSlice.name}/restoreUser`),
};

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectJwt = (state: RootState) => state.auth.jwt;
export const selectIsLogged = (state: RootState) => !!state.auth.jwt;

// Reducer
export default authSlice.reducer;
