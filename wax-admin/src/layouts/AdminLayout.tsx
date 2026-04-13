import { NavLink, Outlet } from 'react-router';
import { adminBrand, adminNavigation } from '@/config/brand';

export const AdminLayout = () => {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        {/* Identidad general del admin: nombre del proyecto y descripcion corta del alcance. */}
        <div className="admin-brand">
          <span className="admin-brand-kicker">{adminBrand.label}</span>
          <h1 className="admin-brand-title">{adminBrand.name}</h1>
          <p className="admin-brand-copy">{adminBrand.description}</p>
        </div>

        {/* Navegacion principal: aqui pueden vivir los accesos a modulos reales del admin. */}
        <nav className="admin-nav" aria-label="Navegacion principal">
          <span className="admin-nav-label">Estructura</span>

          {adminNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? 'admin-nav-link is-active' : 'admin-nav-link'
              }
            >
              <span>{item.label}</span>
              <span className="admin-nav-meta">{item.meta}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bloque auxiliar para notas del equipo, accesos rapidos o estado del entorno. */}
        <div className="admin-sidebar-footnote">
          <span className="admin-section-label">1</span>
          <p>
            2
          </p>
        </div>
      </aside>

      <main className="admin-main">
        {/* Cabecera del contenido: aqui puede ir el titulo dinamico de cada modulo y acciones globales. */}
        <header className="admin-topbar">
          <div className="admin-topbar-copy">
            <span className="admin-section-label">3</span>
            <h2 className="admin-topbar-title">4</h2>
            <p className="admin-topbar-subtitle">
              5
            </p>
          </div>

          <div className="admin-actions">
            <span className="admin-chip">6</span>
            <button type="button" className="admin-button">
              7
            </button>
          </div>
        </header>

        {/* Zona de salida de rutas: cada pagina real del admin se renderizara aqui. */}
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};