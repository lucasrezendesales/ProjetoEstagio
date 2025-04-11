// src/components/NewPayableModal.tsx
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getUserIdFromToken } from '../../utils/auth';
import { AccountPayable } from '../../types/AccountPayable';

interface NewPayableModalProps {
  isOpen: boolean;
  onClose: () => void;
  payable?: AccountPayable;
}

export default function NewPayableModal({
  isOpen,
  onClose,
  payable,
}: NewPayableModalProps) {
  const [formData, setFormData] = useState({
    document: '',
    amount: '',
    amount_paid: '',
    issue_date: '',
    due_date: '',
    payment_date: '',
    status: 'pending',
  });

  useEffect(() => {
    if (payable) {
      setFormData({
        document: payable.document || '',
        amount: payable.amount?.toString() || '',
        amount_paid: payable.amount_paid?.toString() || '',
        issue_date: payable.issue_date || '',
        due_date: payable.due_date || '',
        payment_date: payable.payment_date || '',
        status: payable.status || 'pending',
      });
    }
  }, [payable]);

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
      amount_paid: parseFloat(formData.amount_paid),
      fk_user_id,
    };

    try {
      const url = payable
        ? `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountpayable/${payable.id}`
        : `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountpayable`;

      const method = payable ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao salvar conta');

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
            {payable ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'}
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
                Valor Pago
              </label>
              <input
                type="number"
                name="amount_paid"
                value={formData.amount_paid}
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
                Data de Pagamento
              </label>
              <input
                type="date"
                name="payment_date"
                value={formData.payment_date}
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
                <option value="paid">Pago</option>
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
