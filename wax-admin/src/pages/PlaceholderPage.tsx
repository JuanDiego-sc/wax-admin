type PlaceholderPageProps = {
  section: string;
};

export const PlaceholderPage = ({ section }: PlaceholderPageProps) => {
  return (
    <section className="admin-page-state">
      <div className="admin-page-state-card">
        <span className="admin-section-label">Espacio reservado</span>
        <h2>{section}</h2>
        <p>
          Esta ruta existe para dejar la arquitectura conectada desde ya. Las paginas
          reales y las integraciones con endpoints se dejaron para la siguiente fase.
        </p>
      </div>
    </section>
  );
};