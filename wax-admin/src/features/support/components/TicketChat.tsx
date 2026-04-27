import { useState, useRef, useEffect } from 'react';
import type { CommentDto } from '@/features/support/types/support';

type TicketChatProps = {
  comments: CommentDto[];
  isConnected: boolean;
  isSending: boolean;
  onSend: (body: string) => void;
};

const formatTime = (iso: string): string => {
  return new Date(iso).toLocaleString('es-CO', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const TicketChat = ({ comments, isConnected, isSending, onSend }: TicketChatProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMessage('');
  };

  return (
    <div className="admin-chat">
      <div className="admin-chat-header">
        <span className="admin-form-label">Chat del ticket</span>
        <span className={`admin-status ${isConnected ? 'is-live' : 'is-alert'}`}>
          {isConnected ? 'Conectado' : 'Desconectado'}
        </span>
      </div>

      <div className="admin-chat-messages">
        {comments.length === 0 ? (
          <p className="admin-chat-empty">No hay comentarios aun</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="admin-chat-message">
              <div className="admin-chat-message-header">
                <strong>{comment.userName}</strong>
                <span className="admin-chat-time">{formatTime(comment.createdAt)}</span>
              </div>
              <p className="admin-chat-message-body">{comment.body}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="admin-chat-form" onSubmit={handleSubmit}>
        <input
          className="admin-form-input"
          type="text"
          placeholder={isConnected ? 'Escribe un mensaje...' : 'Reconectando...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isConnected}
        />
        <button
          type="submit"
          className="admin-button"
          disabled={!isConnected || !message.trim() || isSending}
        >
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};
