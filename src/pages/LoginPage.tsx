import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginContainer } from 'features/auth/components/LoginContainer';
import TitleTypography from 'libs/ui/components/TitleTypography';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <TitleTypography title={t('login.title')} />
      <LoginContainer />
    </>
  );
};

export default LoginPage;
