import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const RouteErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="admin-page-state">
      <div className="admin-page-state-card">
        <span className="admin-section-label">Error de ruta</span>
        <h2>No se pudo renderizar esta ruta del panel.</h2>
        <p>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : 'Ocurrio un error inesperado mientras se cargaba la estructura del panel.'}
        </p>
        <Link to="/" className="admin-button">
          Volver al resumen
        </Link>
      </div>
    </section>
  );
};