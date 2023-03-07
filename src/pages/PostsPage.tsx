import React from 'react';
import { useTranslation } from 'react-i18next';

import 'App.css';
import { PostsContainer } from 'features/posts';
import TitleTypography from 'libs/ui/components/TitleTypography';

const PostsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <TitleTypography title={t('home.title')} />
      <PostsContainer />
    </>
  );
};

export default PostsPage;
