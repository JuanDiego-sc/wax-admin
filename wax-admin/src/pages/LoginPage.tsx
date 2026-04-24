import { useState, type SyntheticEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import editorialLoginImage from '@/assets/images/editorial-login.png';
import { useAdminLogin, useAdminLogout, useCurrentAdmin } from '@/lib/hooks/useAdminAccount';
import { routePaths } from '@/routes/routePaths';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: currentUser, isLoading } = useCurrentAdmin();
  const loginMutation = useAdminLogin();
  const logoutMutation = useAdminLogout();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const locationState = location.state as { from?: { pathname?: string } } | null;
  const redirectTo = locationState?.from?.pathname ?? routePaths.overview;

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await loginMutation.mutateAsync({ email, password });
      navigate(redirectTo, { replace: true });
    } catch {
      setErrorMessage('No fue posible iniciar sesion con esas credenciales.');
    }
  };

  if (currentUser?.roles?.includes('Admin')) {
    return (
      <section className="admin-auth-page">
        <div className="admin-auth-card">
          <span className="admin-section-label">Sesion activa</span>
          <h1 className="admin-auth-title">Ya estas dentro del panel.</h1>
          <p className="admin-auth-text">
            Entraste como {currentUser.email}. Puedes volver directamente al panel administrativo.
          </p>
          <Link to={routePaths.overview} className="admin-button">
            Ir al panel
          </Link>
        </div>
      </section>
    );
  }

  if (currentUser) {
    return (
      <section className="admin-auth-page">
        <div className="admin-auth-card">
          <span className="admin-section-label">Acceso denegado</span>
          <h1 className="admin-auth-title">Esta cuenta no tiene permisos de administrador.</h1>
          <p className="admin-auth-text">
            Entraste como {currentUser.email}, pero esa sesion no tiene el rol necesario para acceder al panel.
          </p>
          <div className="admin-auth-actions">
            <Link to={routePaths.forbidden} className="admin-button">
              Ver pagina 403
            </Link>
            <button
              className="admin-button admin-button-secondary"
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? 'Cerrando sesion...' : 'Cerrar sesion'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-auth-page">
      <div className="admin-auth-shell">
        <div className="admin-auth-visual">
          <img
            className="admin-auth-visual-image"
            src={editorialLoginImage}
            alt="Pieza editorial de WAX"
          />
          <div aria-hidden className="admin-auth-visual-overlay" />
          <div className="admin-auth-visual-copy">
            <strong className="admin-auth-visual-title">WAX ADMIN</strong>
          </div>
        </div>

        <div className="admin-auth-card">
          <span className="admin-section-label">Acceso administrador</span>
          <h1 className="admin-auth-title">Iniciar sesion</h1>
          <p className="admin-auth-text">
            Usa el usuario administrador para entrar al modulo interno de gestion.
          </p>

          <form className="admin-auth-form" onSubmit={handleSubmit}>
            <label className="admin-auth-field">
              <span>Correo</span>
              <input
                className="admin-auth-input"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loginMutation.isPending || isLoading}
                required
              />
            </label>

            <label className="admin-auth-field">
              <span>Contrasena</span>
              <input
                className="admin-auth-input"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa la contrasena"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loginMutation.isPending || isLoading}
                required
              />
            </label>

            {errorMessage ? <p className="admin-auth-feedback is-error">{errorMessage}</p> : null}

            <button className="admin-button admin-button-block" type="submit" disabled={loginMutation.isPending || isLoading}>
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};