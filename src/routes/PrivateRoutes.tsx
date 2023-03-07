import { Navigate, Outlet } from 'react-router-dom';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import { LOGIN_ROUTER } from 'routes/constants';

const PrivateRoutes = () => {
  const { isLogged } = useAuthService();
  return isLogged ? <Outlet /> : <Navigate to={LOGIN_ROUTER} />;
};

export default PrivateRoutes;
