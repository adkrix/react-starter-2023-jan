import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import { useAuthService } from 'features/auth/hooks/useAuthService';
import {
  ABOUT_ROUTER,
  LOGIN_ROUTER,
  LOGOUT_ROUTER,
  POSTS_ROUTER,
  ROOT_ROUTER,
} from 'routes/constants';
import PrivateRoutes from 'routes/PrivateRoutes';
import PublicRoutes from 'routes/PublicRoutes';

const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const PostsPage = React.lazy(() => import('pages/PostsPage'));
const AboutPage = React.lazy(() => import('pages/AboutPage'));

const AppRoutes = () => (
  <>
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROOT_ROUTER} element={<HomePage />} />
          <Route element={<PublicRoutes />}>
            <Route path={LOGIN_ROUTER} element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path={POSTS_ROUTER} element={<PostsPage />} />
            <Route path={ABOUT_ROUTER} element={<AboutPage />} />
            <Route path={LOGOUT_ROUTER} action={useAuthService().logout} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </>
);

export default AppRoutes;
