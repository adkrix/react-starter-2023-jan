import { Navigate, Outlet } from 'react-router-dom';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import { ROOT_ROUTER } from 'routes/constants';

type PublicRoutesProps = {
  route?: string | null;
};

const PublicRoutes = ({ route = null }: PublicRoutesProps) => {
  const { isLogged } = useAuthService();
  return isLogged ? <Navigate to={route ?? ROOT_ROUTER} /> : <Outlet />;
};

export default PublicRoutes;
