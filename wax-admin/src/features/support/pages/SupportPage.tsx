import { useState } from 'react';
import { TicketTable } from '@/features/support/components/TicketTable';
import { TicketFilters } from '@/features/support/components/TicketFilters';
import { DeleteTicketModal } from '@/features/support/components/DeleteTicketModal';
import { useTickets } from '@/features/support/hooks/useTickets';
import { useDeleteTicket } from '@/features/support/hooks/useTicketMutations';
import type { SupportTicketDto } from '@/features/support/types/support';

export const SupportPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [ticketToDelete, setTicketToDelete] = useState<SupportTicketDto | null>(null);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPageNumber(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPageNumber(1);
  };

  const { data, isLoading } = useTickets({
    pageNumber,
    pageSize: 10,
    status: status || undefined,
    category: category || undefined,
    orderBy: 'createdAt',
  });

  const deleteMutation = useDeleteTicket();

  const handleConfirmDelete = () => {
    if (!ticketToDelete) return;
    deleteMutation.mutate(ticketToDelete.id, {
      onSettled: () => setTicketToDelete(null),
    });
  };

  return (
    <div className="admin-catalog">
      <div className="admin-catalog-header">
        <TicketFilters
          status={status}
          category={category}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isLoading ? (
        <div className="admin-canvas" aria-label="Cargando tickets" />
      ) : data ? (
        <>
          <TicketTable tickets={data.items ?? []} onDelete={setTicketToDelete} />

          {data.totalPages > 1 && (
            <div className="admin-pagination">
              <button
                type="button"
                className="admin-button admin-button-sm admin-button-ghost"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
              >
                Anterior
              </button>
              <span className="admin-pagination-info">
                Pagina {data.pageNumber} de {data.totalPages}
              </span>
              <button
                type="button"
                className="admin-button admin-button-sm admin-button-ghost"
                disabled={pageNumber >= data.totalPages}
                onClick={() => setPageNumber((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : null}

      {ticketToDelete && (
        <DeleteTicketModal
          ticket={ticketToDelete}
          isPending={deleteMutation.isPending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTicketToDelete(null)}
        />
      )}
    </div>
  );
};
