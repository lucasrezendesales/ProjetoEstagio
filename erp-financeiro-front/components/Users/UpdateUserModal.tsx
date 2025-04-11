/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  initialData: {
    username: string;
    email: string;
    full_name?: string;
    role?: string;
    status?: string;
  };
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  userId,
  initialData,
}: UpdateUserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        username: initialData.username,
        email: initialData.email,
        full_name: initialData.full_name || '',
        role: initialData.role || 'user',
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}`,
        formData
      );
      onClose();
      window.location.reload();
    } catch (err: any) {
      setError('Erro ao atualizar usuário.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-100">
      <div className="modal-content bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <div className="modal-header p-6 border-b border-[#e2e8f0] flex justify-between items-center">
          <h3 className="text-xl font-semibold text-text">Editar Usuário</h3>
          <button
            className="close-modal bg-transparent border-none text-text-light text-xl cursor-pointer"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body p-6">
          <form id="update-user-form" onSubmit={handleSubmit}>
            <div className="form-row flex gap-6 mb-6">
              <div className="form-group flex-1 flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-sm text-text-light font-medium"
                >
                  Nome de Usuário *
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                />
              </div>

              <div className="form-group flex-1 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm text-text-light font-medium"
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                />
              </div>
            </div>

            <div className="form-row flex gap-6 mb-6">
              <div className="form-group flex-1 flex flex-col gap-2">
                <label
                  htmlFor="full_name"
                  className="text-sm text-text-light font-medium"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                />
              </div>

              <div className="form-group flex-1 flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm text-text-light font-medium"
                >
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Deixe em branco para manter"
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                />
              </div>
            </div>

            <div className="form-row flex gap-6 mb-6">
              <div className="form-group flex-1 flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="text-sm text-text-light font-medium"
                >
                  Perfil
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                  <option value="owner">Proprietário</option>
                </select>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          </form>
        </div>

        <div className="modal-footer p-4 border-t border-[#e2e8f0] flex justify-end gap-3">
          <button
            className="cancel-button px-4 py-2 bg-white text-text-light border border-[#e2e8f0] rounded text-sm cursor-pointer hover:bg-[#f8f9fa]"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="update-user-form"
            disabled={loading}
            className="save-button px-4 py-2 bg-green-700 text-white border-none rounded text-sm cursor-pointer hover:bg-green-800"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
