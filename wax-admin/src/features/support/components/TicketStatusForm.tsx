import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TICKET_STATUS, TICKET_CATEGORY } from '@/features/support/types/support';
import type { SupportTicketDto } from '@/features/support/types/support';

const schema = z.object({
  subject: z.string().min(1, 'El asunto es obligatorio'),
  description: z.string().min(1, 'La descripcion es obligatoria'),
  category: z.enum(TICKET_CATEGORY),
  status: z.enum(TICKET_STATUS),
});

export type TicketFormValues = z.infer<typeof schema>;

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

type TicketStatusFormProps = {
  ticket: SupportTicketDto;
  isPending: boolean;
  onSubmit: (data: TicketFormValues) => void;
};

export const TicketStatusForm = ({ ticket, isPending, onSubmit }: TicketStatusFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: ticket.subject,
      description: ticket.description,
      category: ticket.category,
      status: ticket.status,
    },
  });

  return (
    <form className="admin-ticket-status-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="admin-form-field">
        <span className="admin-form-label">Asunto</span>
        <input className="admin-form-input" type="text" {...register('subject')} />
        {errors.subject && <span className="admin-form-error">{errors.subject.message}</span>}
      </label>

      <label className="admin-form-field">
        <span className="admin-form-label">Descripcion</span>
        <textarea
          className="admin-form-input admin-form-textarea"
          rows={3}
          {...register('description')}
        />
        {errors.description && (
          <span className="admin-form-error">{errors.description.message}</span>
        )}
      </label>

      <div className="admin-form-row">
        <label className="admin-form-field">
          <span className="admin-form-label">Categoria</span>
          <select className="admin-form-input" {...register('category')}>
            {TICKET_CATEGORY.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-form-field">
          <span className="admin-form-label">Estado</span>
          <select className="admin-form-input" {...register('status')}>
            {TICKET_STATUS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="admin-product-form-actions">
        <button type="submit" className="admin-button" disabled={isPending || !isDirty}>
          {isPending ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
};
