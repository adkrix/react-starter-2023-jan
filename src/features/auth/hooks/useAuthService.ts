import { useCallback } from 'react';

import { authActions, selectIsLogged } from 'features/auth/store';
import { TLoginForm } from 'features/auth/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export type PostServiceOperators = {
  isLogged: boolean;
  login: (data: TLoginForm) => void;
};

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useAuthService = (): Readonly<PostServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    isLogged: useAppSelector(selectIsLogged),
    login: useCallback(
      (loginRequest: TLoginForm) => {
        dispatch(authActions.login(loginRequest));
      },
      [dispatch],
    ),
  };
};

export default useAuthService;
