import type { UserDto } from '@/features/users/types/user';

type DisableUserModalProps = {
  user: UserDto;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DisableUserModal = ({
  user,
  isPending,
  onConfirm,
  onCancel,
}: DisableUserModalProps) => {
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-modal-title">Deshabilitar usuario</h3>
        <p className="admin-modal-text">
          ¿Estás seguro de que quieres deshabilitar a <strong>{user.email}</strong>? El usuario no
          podrá iniciar sesión hasta que sea habilitado nuevamente.
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
            {isPending ? 'Deshabilitando...' : 'Deshabilitar'}
          </button>
        </div>
      </div>
    </div>
  );
};
