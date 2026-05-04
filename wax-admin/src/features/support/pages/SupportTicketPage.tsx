import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { TicketStatusForm } from '@/features/support/components/TicketStatusForm';
import { TicketChat } from '@/features/support/components/TicketChat';
import { useTicket } from '@/features/support/hooks/useTickets';
import { useUpdateTicket } from '@/features/support/hooks/useTicketMutations';
import { useSupportChat } from '@/features/support/hooks/useSupportChat';
import { useComments } from '@/features/support/hooks/useComments';
import { useSendComment } from '@/features/support/hooks/useSendComment';
import { useCurrentAdmin } from '@/lib/hooks/useAdminAccount';
import { routePaths } from '@/routes/routePaths';
import type { TicketFormValues } from '@/features/support/components/TicketStatusForm';

export const SupportTicketPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ticket, isLoading, isError } = useTicket(id!);
  const updateMutation = useUpdateTicket();

  const { data: currentAdmin } = useCurrentAdmin();

  // SignalR connection — writes comments into React Query cache
  const { isConnected, sendComment } = useSupportChat(id!);

  // Read comments from React Query cache (populated by SignalR events)
  const { data: comments = [] } = useComments(id!);

  // Mutation for sending comments
  const sendMutation = useSendComment();

  useEffect(() => {
    if (isError) {
      toast.error('Ticket no encontrado');
      navigate(routePaths.support, { replace: true });
    }
  }, [isError, navigate]);

  const handleUpdate = (data: TicketFormValues) => {
    if (!ticket) return;
    updateMutation.mutate({ id: ticket.id, ...data });
  };

  const handleSendComment = (body: string) => {
    sendMutation.mutate({
      ticketId: id!,
      body,
      sendFn: sendComment,
    });
  };

  if (isLoading) {
    return <div className="admin-canvas" aria-label="Cargando ticket" />;
  }

  if (!ticket) return null;

  return (
    <div className="admin-ticket-detail">
      <div className="admin-product-page-header">
        <div className="admin-ticket-detail-top">
          <div>
            <span className="admin-section-label">Soporte</span>
            <h2 className="admin-product-page-title">{ticket.subject}</h2>
          </div>
          <button
            type="button"
            className="admin-button admin-button-ghost"
            onClick={() => navigate(routePaths.support)}
          >
            Volver
          </button>
        </div>
      </div>

      <div className="admin-ticket-info">
        <div className="admin-card">
          <span className="admin-form-label">Usuario</span>
          <p>{ticket.userFullName}</p>
          <p style={{ color: 'var(--wax-admin-muted)', fontSize: '0.85rem' }}>
            {ticket.userEmail}
          </p>
        </div>
        <div className="admin-card">
          <span className="admin-form-label">Orden</span>
          <p>{ticket.orderId}</p>
        </div>
      </div>

      <div className="admin-ticket-body">
        <div className="admin-ticket-form-section">
          <TicketStatusForm
            ticket={ticket}
            isPending={updateMutation.isPending}
            onSubmit={handleUpdate}
          />
        </div>

        <div className="admin-ticket-chat-section">
          <TicketChat
            comments={comments}
            currentUserName={currentAdmin?.userName}
            isConnected={isConnected}
            isSending={sendMutation.isPending}
            onSend={handleSendComment}
          />
        </div>
      </div>
    </div>
  );
};
