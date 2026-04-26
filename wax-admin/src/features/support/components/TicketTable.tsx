import { useNavigate } from 'react-router';
import type { SupportTicketDto } from '@/features/support/types/support';

type TicketTableProps = {
  tickets: SupportTicketDto[];
  onDelete: (ticket: SupportTicketDto) => void;
};

const STATUS_LABELS: Record<string, string> = {
  Open: 'Abierto',
  InProgress: 'En progreso',
  Closed: 'Cerrado',
};

const STATUS_CLASS: Record<string, string> = {
  Open: 'is-draft',
  InProgress: 'is-live',
  Closed: 'is-alert',
};

const CATEGORY_LABELS: Record<string, string> = {
  OrderIssue: 'Pedido',
  PaymentIssue: 'Pago',
  ProductIssue: 'Producto',
  Other: 'Otro',
};

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const TicketTable = ({ tickets, onDelete }: TicketTableProps) => {
  const navigate = useNavigate();

  if (!tickets || tickets.length === 0) {
    return (
      <div className="admin-empty-state">
        <p>No se encontraron tickets</p>
      </div>
    );
  }

  return (
    <div className="admin-table-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Asunto</th>
            <th>Usuario</th>
            <th>Categoria</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.subject}</td>
              <td>
                <div>
                  <div>{ticket.userFullName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--wax-admin-muted)' }}>
                    {ticket.userEmail}
                  </div>
                </div>
              </td>
              <td>{CATEGORY_LABELS[ticket.category] ?? ticket.category}</td>
              <td>
                <span className={`admin-status ${STATUS_CLASS[ticket.status] ?? ''}`}>
                  {STATUS_LABELS[ticket.status] ?? ticket.status}
                </span>
              </td>
              <td>{formatDate(ticket.createdAt)}</td>
              <td>
                <div className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-button admin-button-sm"
                    onClick={() => navigate(`/support/${ticket.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    type="button"
                    className="admin-button admin-button-sm admin-button-danger"
                    onClick={() => onDelete(ticket)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
