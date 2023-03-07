import React from 'react';
import { useTranslation } from 'react-i18next';

import TitleTypography from 'libs/ui/components/TitleTypography';

const HomePage = () => {
  const { t } = useTranslation();

  return <TitleTypography title={t('home.title')} />;
};

export default HomePage;
