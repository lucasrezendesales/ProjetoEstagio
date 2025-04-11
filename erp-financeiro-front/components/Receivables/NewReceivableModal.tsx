// src/components/NewReceivableModal.tsx
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getUserIdFromToken } from '../../utils/auth';
import { AccountReceivable } from '@/types/AccountReceivable';

interface NewReceivableModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivable?: AccountReceivable;
}

export default function NewReceivableModal({
  isOpen,
  onClose,
  receivable,
}: NewReceivableModalProps) {
  const [formData, setFormData] = useState({
    document: '',
    amount: '',
    amount_received: '',
    issue_date: '',
    due_date: '',
    receipt_date: '',
    status: 'pending',
  });

  useEffect(() => {
    if (receivable) {
      setFormData({
        document: receivable.document || '',
        amount: receivable.amount?.toString() || '',
        amount_received: receivable.amount_received?.toString() || '',
        issue_date: receivable.issue_date || '',
        due_date: receivable.due_date || '',
        receipt_date: receivable.receipt_date || '',
        status: receivable.status || 'pending',
      });
    }
  }, [receivable]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fk_user_id = getUserIdFromToken();
    if (!fk_user_id) {
      alert('Usuário não autenticado.');
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      amount_received: parseFloat(formData.amount_received),
      fk_user_id,
    };

    try {
      const url = receivable
        ? `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountreceivable/${receivable.id}`
        : `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountreceivable`;

      const method = receivable ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao salvar recebível');

      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {receivable ? 'Editar Recebimento' : 'Novo Recebimento'}
          </h3>
          <button
            className="text-gray-500 text-xl hover:text-gray-800"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Documento
              </label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Valor
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Valor Recebido
              </label>
              <input
                type="number"
                name="amount_received"
                value={formData.amount_received}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Emissão
              </label>
              <input
                type="date"
                name="issue_date"
                value={formData.issue_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Vencimento
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Data de Recebimento
              </label>
              <input
                type="date"
                name="receipt_date"
                value={formData.receipt_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="received">Recebido</option>
                <option value="overdue">Vencido</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-black border border-gray-200 rounded text-sm hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded text-sm hover:bg-green-800"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
