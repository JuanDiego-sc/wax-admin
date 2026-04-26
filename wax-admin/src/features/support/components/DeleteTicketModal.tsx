import type { SupportTicketDto } from '@/features/support/types/support';

type DeleteTicketModalProps = {
  ticket: SupportTicketDto;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteTicketModal = ({
  ticket,
  isPending,
  onConfirm,
  onCancel,
}: DeleteTicketModalProps) => {
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-modal-title">Eliminar ticket</h3>
        <p className="admin-modal-text">
          Estas seguro de que quieres eliminar el ticket <strong>{ticket.subject}</strong>? Esta
          accion no se puede deshacer.
        </p>
        <div className="admin-modal-actions">
          <button
            type="button"
            className="admin-button admin-button-ghost"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="admin-button admin-button-danger"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};
