// DUCKS pattern
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginResponse, LoginFormInput } from 'features/auth/types';
import { FailedResponse, defaultUser } from 'libs/core/api';
import type { RootState } from 'store/store';

export type AuthState = LoginResponse & {
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
      state.isLoading = false;
    },
    loginSucceeded(state, action: PayloadAction<LoginResponse>) {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
      state.error = '';
      state.isLoading = false;
    },
    loginFailed(state, action: PayloadAction<FailedResponse>) {
      state.jwt = '';
      state.user = defaultUser();
      state.error = action.payload.error.message;
      state.isLoading = false;
    },
  },
});

// Actions
export const authActions = {
  login: createAction(`${authSlice.name}/login`, (loginRequest: LoginFormInput) => ({
    payload: loginRequest,
  })),
};

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectJwt = (state: RootState) => state.auth.jwt;
export const selectIsLogged = (state: RootState) => !!state.auth.jwt;

// Reducer
export default authSlice.reducer;
