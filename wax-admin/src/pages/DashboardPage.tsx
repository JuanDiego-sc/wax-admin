const summaryCards = [
  {
    label: 'Arquitectura',
    value: '12',
    trend: '+ carpetas alineadas',
    copy: 'Los directorios principales ya siguen la misma forma del cliente.',
  },
  {
    label: 'Superficies listas',
    value: '06',
    trend: '+ piezas visuales',
    copy: 'Sidebar, cabecera, tarjetas, tablas y estados vacios ya tienen estilo base.',
  },
  {
    label: 'Modulos de negocio',
    value: '00',
    trend: 'pendiente',
    copy: 'Los endpoints y los flujos administrativos reales se dejaron vacios a proposito.',
  },
] as const;

const recentRows = [
  { area: 'Catalogo', owner: 'Pendiente', state: 'Solo estructura', tone: 'is-draft' },
  { area: 'Pedidos', owner: 'Pendiente', state: 'Solo estructura', tone: 'is-draft' },
  { area: 'Clientes', owner: 'Pendiente', state: 'Solo estructura', tone: 'is-draft' },
] as const;

export const DashboardPage = () => {
  return (
    <>
      <section className="admin-hero">
        <div className="admin-hero-copy">
          <span className="admin-section-label">Resumen</span>
          <h2 className="admin-hero-title">Una base limpia para el admin, sin logica adelantada.</h2>
          <p className="admin-hero-text">
            Este proyecto ya coincide con el cliente a nivel estructural: carpetas,
            rutas, providers, capa de configuracion, layout y estilos compartidos ya
            estan listos para la siguiente fase de implementacion.
          </p>
        </div>

        <div className="admin-hero-aside">
          <div className="admin-card">
            <span className="admin-card-label">Por que esta base</span>
            <p className="admin-card-text">
              Mantiene una estructura familiar para el equipo y reduce friccion cuando
              empiecen a entrar modulos reales.
            </p>
          </div>
          <div className="admin-card">
            <span className="admin-card-label">Alcance actual</span>
            <p className="admin-card-text">
              No hay agentes API, formularios, pantallas CRUD reales ni politica de
              acceso. Solo la base reutilizable y el sistema visual.
            </p>
          </div>
        </div>
      </section>

      <section className="admin-summary-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className="admin-card">
            <span className="admin-card-label">{card.label}</span>
            <strong className="admin-card-value">{card.value}</strong>
            <span className="admin-card-trend">{card.trend}</span>
            <p className="admin-card-text">{card.copy}</p>
          </article>
        ))}
      </section>

      <section className="admin-panel-grid">
        <article className="admin-table-card">
          <span className="admin-table-caption">Estado de modulos</span>
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Responsable</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentRows.map((row) => (
                <tr key={row.area}>
                  <td>{row.area}</td>
                  <td>{row.owner}</td>
                  <td>
                    <span className={`admin-status ${row.tone}`}>{row.state}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="admin-panel">
          <span className="admin-section-label">Siguiente capa sugerida</span>
          <p className="admin-panel-text">
            La siguiente persona puede conectar modulos por dominio en `features`, crear
            servicios tipados dentro de `services` y ampliar paginas por ruta sin tocar
            la estructura externa.
          </p>
          <div className="admin-highlight-grid">
            <div className="admin-card">
              <span className="admin-card-label">Features</span>
              <p className="admin-card-text">Aqui pueden vivir los modulos de productos, pedidos, clientes o CMS.</p>
            </div>
            <div className="admin-card">
              <span className="admin-card-label">Services</span>
              <p className="admin-card-text">Aqui pueden ir la capa de transporte, DTOs y contratos API cuando existan.</p>
            </div>
            <div className="admin-card">
              <span className="admin-card-label">Lib + Utils</span>
              <p className="admin-card-text">Aqui pueden quedar hooks compartidos, helpers y utilidades del admin.</p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};