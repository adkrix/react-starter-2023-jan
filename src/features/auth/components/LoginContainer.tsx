import Container from '@mui/material/Container';
import React from 'react';

import { LoginForm } from 'features/auth/components/LoginForm';
import { useAuthService } from 'features/auth/hooks/useAuthService';

export const LoginContainer = () => {
  const { login } = useAuthService();
  return (
    <>
      <Container maxWidth="xs">
        <LoginForm onSubmitClick={login} />
      </Container>
    </>
  );
};
