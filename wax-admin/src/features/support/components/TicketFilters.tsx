import { TICKET_STATUS, TICKET_CATEGORY } from '@/features/support/types/support';

type TicketFiltersProps = {
  status: string;
  category: string;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

const STATUS_LABELS: Record<string, string> = {
  Open: 'Abierto',
  InProgress: 'En progreso',
  Closed: 'Cerrado',
};

const CATEGORY_LABELS: Record<string, string> = {
  OrderIssue: 'Problema de pedido',
  PaymentIssue: 'Problema de pago',
  ProductIssue: 'Problema de producto',
  Other: 'Otro',
};

export const TicketFilters = ({
  status,
  category,
  onStatusChange,
  onCategoryChange,
}: TicketFiltersProps) => {
  return (
    <div className="admin-ticket-filters">
      <select
        className="admin-form-input admin-filter-select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Todos los estados</option>
        {TICKET_STATUS.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      <select
        className="admin-form-input admin-filter-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas las categorias</option>
        {TICKET_CATEGORY.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_LABELS[c]}
          </option>
        ))}
      </select>
    </div>
  );
};
