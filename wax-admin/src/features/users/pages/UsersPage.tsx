import { useState } from 'react';
import { UserTable } from '@/features/users/components/UserTable';
import { RoleModal } from '@/features/users/components/RoleModal';
import { DisableUserModal } from '@/features/users/components/DisableUserModal';
import { useUsers } from '@/features/users/hooks/useUsers';
import {
  useAddRole,
  useRemoveRole,
  useDisableUser,
} from '@/features/users/hooks/useUserMutations';
import type { Role, UserDto } from '@/features/users/types/user';

export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userForRole, setUserForRole] = useState<UserDto | null>(null);
  const [userToDisable, setUserToDisable] = useState<UserDto | null>(null);

  const { data: users, isLoading } = useUsers();
  const addRoleMutation = useAddRole();
  const removeRoleMutation = useRemoveRole();
  const disableMutation = useDisableUser();

  const filteredUsers = users?.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddRole = (userId: string, roleName: Role) => {
    addRoleMutation.mutate(
      { userId, roleName },
      { onSettled: () => setUserForRole(null) },
    );
  };

  const handleRemoveRole = (userId: string, roleName: Role) => {
    removeRoleMutation.mutate(
      { userId, roleName },
      { onSettled: () => setUserForRole(null) },
    );
  };

  const handleConfirmDisable = () => {
    if (!userToDisable) return;
    disableMutation.mutate(userToDisable.id, {
      onSettled: () => setUserToDisable(null),
    });
  };

  return (
    <div className="admin-catalog">
      <div className="admin-catalog-header">
        <div className="admin-catalog-search">
          <input
            className="admin-form-input"
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="admin-canvas" aria-label="Cargando usuarios" />
      ) : filteredUsers ? (
        <UserTable
          users={filteredUsers}
          onManageRole={setUserForRole}
          onToggleStatus={setUserToDisable}
          isToggling={disableMutation.isPending}
        />
      ) : null}

      {userForRole && (
        <RoleModal
          user={userForRole}
          isPending={addRoleMutation.isPending || removeRoleMutation.isPending}
          onAddRole={handleAddRole}
          onRemoveRole={handleRemoveRole}
          onClose={() => setUserForRole(null)}
        />
      )}

      {userToDisable && (
        <DisableUserModal
          user={userToDisable}
          isPending={disableMutation.isPending}
          onConfirm={handleConfirmDisable}
          onCancel={() => setUserToDisable(null)}
        />
      )}
    </div>
  );
};
