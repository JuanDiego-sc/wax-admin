import { useState } from 'react';
import { ROLES, type Role, type UserDto } from '@/features/users/types/user';

type RoleModalProps = {
  user: UserDto;
  isPending: boolean;
  onAddRole: (userId: string, roleName: Role) => void;
  onRemoveRole: (userId: string, roleName: Role) => void;
  onClose: () => void;
};

export const RoleModal = ({
  user,
  isPending,
  onAddRole,
  onRemoveRole,
  onClose,
}: RoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES[0]);

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-modal-title">Gestionar rol</h3>
        <p className="admin-modal-text">
          Usuario: <strong>{user.email}</strong>
          <br />
          Rol actual: <strong>{user.role ?? 'Sin rol'}</strong>
        </p>

        <div className="admin-form-field">
          <span className="admin-form-label">Seleccionar rol</span>
          <select
            className="admin-form-input"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as Role)}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-modal-actions">
          <button
            type="button"
            className="admin-button admin-button-ghost"
            onClick={onClose}
            disabled={isPending}
          >
            Cerrar
          </button>
          {user.role && (
            <button
              type="button"
              className="admin-button admin-button-danger"
              onClick={() => onRemoveRole(user.id, user.role!)}
              disabled={isPending}
            >
              {isPending ? 'Removiendo...' : `Remover ${user.role}`}
            </button>
          )}
          <button
            type="button"
            className="admin-button"
            onClick={() => onAddRole(user.id, selectedRole)}
            disabled={isPending}
          >
            {isPending ? 'Asignando...' : 'Asignar rol'}
          </button>
        </div>
      </div>
    </div>
  );
};
