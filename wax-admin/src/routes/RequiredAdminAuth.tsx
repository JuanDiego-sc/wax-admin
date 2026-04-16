import { Navigate, Outlet, useLocation } from 'react-router';
import { useCurrentAdmin } from '@/lib/hooks/useAdminAccount';
import { routePaths } from '@/routes/routePaths';

export const RequiredAdminAuth = () => {
  const { data: currentUser, isLoading } = useCurrentAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <section className="admin-page-state">
        <div className="admin-page-state-card">
          <span className="admin-section-label">Verificando acceso</span>
          <h2>Comprobando sesion administrativa</h2>
          <p>Estamos validando la sesion y los permisos del usuario.</p>
        </div>
      </section>
    );
  }

  if (!currentUser) {
    return <Navigate to={routePaths.login} replace state={{ from: location }} />;
  }

  if (!currentUser.roles?.includes('Admin')) {
    return <Navigate to={routePaths.forbidden} replace />;
  }

  return <Outlet />;
};