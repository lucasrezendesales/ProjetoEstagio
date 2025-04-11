/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const openUpdateModal = (user: any) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir este usuário?'
    );
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <section className="data-section bg-white rounded-lg shadow p-6 mt-6">
      <div className="section-header flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-text">Todos os Usuários</h3>
        <div className="pagination-info text-sm text-text-light">
          {loading
            ? 'Carregando usuários...'
            : `Mostrando 1-${users.length} de ${users.length} usuários`}
        </div>
      </div>

      <div className="table-responsive overflow-x-auto">
        <table className="data-table w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Usuário
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Nome Completo
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                E-mail
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Perfil
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Status
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Último Login
              </th>
              <th className="text-left p-3 text-text-light font-medium border-b border-[#e2e8f0]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.full_name || '-'}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role || 'Usuário'}</td>
                <td className="p-3">{user.status || 'Ativo'}</td>
                <td className="p-3">{user.lastLogin || 'Nunca'}</td>
                <td className="p-3">
                  <div className="gap-x-2 flex">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openUpdateModal(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={8} className="p-3 text-center text-gray-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <UpdateUserModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          userId={selectedUser.id}
          initialData={{
            username: selectedUser.username,
            email: selectedUser.email,
            full_name: selectedUser.full_name || '',
            role: selectedUser.role || 'user',
          }}
        />
      )}
    </section>
  );
}
