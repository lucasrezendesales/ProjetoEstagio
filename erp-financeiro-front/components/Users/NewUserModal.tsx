'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewUserModal({ isOpen, onClose }: NewUserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users`,
        formData
      );
      onClose();
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Erro ao criar usuário.');
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
          <h3 className="text-xl font-semibold text-text">Novo Usuário</h3>
          <button
            className="close-modal bg-transparent border-none text-text-light text-xl cursor-pointer"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body p-6">
          <form id="new-user-form" onSubmit={handleSubmit}>
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
                <span className="input-hint text-xs text-text-light italic">
                  Máx. 50 caracteres
                </span>
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

            {/* Restante do formulário */}
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
                  Senha *
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border border-[#e2e8f0] rounded text-sm"
                />
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
            form="new-user-form"
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
