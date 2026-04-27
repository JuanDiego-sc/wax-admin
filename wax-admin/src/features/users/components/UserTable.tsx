import type { UserDto } from '@/features/users/types/user';

type UserTableProps = {
  users: UserDto[];
  onManageRole: (user: UserDto) => void;
  onToggleStatus: (user: UserDto) => void;
  isToggling: boolean;
};

export const UserTable = ({ users, onManageRole, onToggleStatus, isToggling }: UserTableProps) => {
  if (!users || users.length === 0) {
    return (
      <div className="admin-empty-state">
        <p>No se encontraron usuarios</p>
      </div>
    );
  }

  return (
    <div className="admin-table-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Email verificado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <span
                  className={`admin-status ${user.emailConfirmed ? 'is-live' : 'is-draft'}`}
                >
                  {user.emailConfirmed ? 'Verificado' : 'Pendiente'}
                </span>
              </td>
              <td>
                <span className="admin-status is-live">
                  {user.role ?? 'Sin rol'}
                </span>
              </td>
              <td>
                <div className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-button admin-button-sm"
                    onClick={() => onManageRole(user)}
                  >
                    Rol
                  </button>
                  <button
                    type="button"
                    className="admin-button admin-button-sm admin-button-danger"
                    onClick={() => onToggleStatus(user)}
                    disabled={isToggling}
                  >
                    Deshabilitar
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
