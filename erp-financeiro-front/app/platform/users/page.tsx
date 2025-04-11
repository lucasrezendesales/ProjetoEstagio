// src/app/users/page.tsx
'use client';
import Sidebar from '@/components/layout/Sidebar';
import MainHeader from '@/components/layout/MainHeader';
import ControlSection from '@/components/ui/ControlSection';
import NewUserModal from '@/components/Users/NewUserModal';
import UsersTable from '@/components/Users/UsersTable';
import useModal from '@/hooks/useModal';
import UpdateUserModal from '@/components/Users/UpdateUserModal';

export default function UsersPage() {
  const newUserModal = useModal('newUser');
  const updateUserModal = useModal('updateUser');

  return (
    <div className="dashboard-container flex min-h-screen">
      <Sidebar />

      <main className="main-content flex-1">
        <MainHeader title="Gerenciamento de Usuários" />

        <div className="content-wrapper p-6">
          <ControlSection onNewClick={newUserModal.openModal} />
          <UsersTable />
        </div>
      </main>

      <NewUserModal
        isOpen={newUserModal.isOpen}
        onClose={newUserModal.closeModal}
      />

      <UpdateUserModal
        isOpen={updateUserModal.isOpen}
        onClose={newUserModal.closeModal}
      />
    </div>
  );
}
