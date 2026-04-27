import { ORDER_STATUS } from '@/features/orders/types/order';

type OrderFiltersProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

const STATUS_LABELS: Record<string, string> = {
  Pending: 'Pendiente',
  PaymentRecieved: 'Pago recibido',
  PaymentFailed: 'Pago fallido',
  PaymentMismatch: 'Pago inconsistente',
  Approved: 'Aprobado',
  Rejected: 'Rechazado',
  CustomOrder: 'Orden personalizada',
};

export const OrderFilters = ({ filter, onFilterChange }: OrderFiltersProps) => {
  return (
    <div className="admin-ticket-filters">
      <select
        className="admin-form-input admin-filter-select"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {ORDER_STATUS.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
};
