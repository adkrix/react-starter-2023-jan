import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Button, ButtonGroup, IconButton, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import {
  ABOUT_ROUTER,
  LOGIN_ROUTER,
  LOGOUT_ROUTER,
  POSTS_ROUTER,
  ROOT_ROUTER,
} from 'routes/constants';

type HeaderProps = {
  currentThemeMode: 'light' | 'dark';
  onChangeThemeClick: () => void;
  onChangeLanguage: (lang: string) => void;
};

const Header = (props: HeaderProps) => {
  const { t } = useTranslation();
  const { isLogged } = useAuthService();

  const { currentThemeMode, onChangeThemeClick, onChangeLanguage } = props;

  return (
    <>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {t('company.title')}
          </Typography>
          <nav>
            <Link
              component={RouterLink}
              to={ROOT_ROUTER}
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              {t('navigation.links.home')}
            </Link>
            {isLogged ? (
              <>
                <Link
                  component={RouterLink}
                  to={POSTS_ROUTER}
                  variant="button"
                  color="text.primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {t('navigation.links.posts')}
                </Link>
                <Link
                  component={RouterLink}
                  to={ABOUT_ROUTER}
                  variant="button"
                  color="text.primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {t('navigation.links.about')}
                </Link>
                <Link
                  component={RouterLink}
                  to={LOGOUT_ROUTER}
                  variant="button"
                  color="text.primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {t('navigation.links.logout')}
                </Link>
              </>
            ) : (
              <Link
                component={RouterLink}
                to={LOGIN_ROUTER}
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                {t('navigation.links.login')}
              </Link>
            )}
            <ButtonGroup variant="text" color="inherit">
              <Button onClick={() => onChangeLanguage('en')}>🇺🇸</Button>
              <Button onClick={() => onChangeLanguage('ru')}>🇷🇺</Button>
              <Button onClick={() => onChangeLanguage('pl')}>🇵🇱</Button>
            </ButtonGroup>
            <IconButton sx={{ ml: 1 }} onClick={onChangeThemeClick} color="inherit">
              {currentThemeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
