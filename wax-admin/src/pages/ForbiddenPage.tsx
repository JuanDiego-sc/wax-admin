import { Link } from 'react-router';
import { routePaths } from '@/routes/routePaths';

export const ForbiddenPage = () => {
  return (
    <section className="admin-page-state">
      <div className="admin-page-state-card">
        <span className="admin-section-label">403</span>
        <h2>No tienes permisos para entrar aqui.</h2>
        <p>Esta zona esta reservada para usuarios con rol de administrador.</p>
        <Link to={routePaths.login} className="admin-button">
          Volver al login
        </Link>
      </div>
    </section>
  );
};