import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { AccountPayable } from '../../types/AccountPayable';
import NewPayableModal from './NewPayableModal';
import { extractDate } from '@/utils/date';

const statusClasses = {
  overdue: 'bg-red-50 hover:bg-red-100 text-red-500',
  pending: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-500',
  scheduled: 'bg-blue-50 hover:bg-blue-100 text-blue-500',
  paid: 'bg-green-50 hover:bg-green-100 text-green-500',
};

const dateBadgeClasses = {
  overdue: 'bg-red-100 text-red-500',
  warning: 'bg-yellow-100 text-yellow-500',
  neutral: 'bg-gray-100 text-gray-500',
};

const PayablesTable = () => {
  const [payables, setPayables] = useState<AccountPayable[]>([]);
  const [editingPayable, setEditingPayable] = useState<AccountPayable | null>(
    null
  );

  const fetchPayables = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountpayable`,
        {}
      );

      const data = await response.json();

      const normalized = Array.isArray(data.data)
        ? data.data.map((item) => ({
            ...item,
            amount: Number(item.amount),
            amount_paid: Number(item.amount_paid),
          }))
        : [];

      setPayables(normalized);
    } catch (err) {
      console.error('Erro ao buscar contas a pagar:', err);
      setPayables([]);
    }
  };

  const deletePayable = async (id: number) => {
    const confirmed = confirm('Deseja realmente excluir esta conta?');
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountpayable/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setPayables((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  const handleEdit = (payable: AccountPayable) => {
    setEditingPayable(payable);
  };

  useEffect(() => {
    fetchPayables();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Contas a Pagar</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th>Documento</th>
              <th>Fornecedor</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Pagamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {payables.map((p) => (
              <tr key={p.id} className="border-b border-gray-200">
                <td className="p-3 text-gray-800">{p.document}</td>
                <td className="p-3 text-gray-800">{p.supplier || '—'}</td>
                <td className="p-3 text-gray-800">
                  R$ {Number(p.amount).toFixed(2)}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      p.status === 'overdue'
                        ? dateBadgeClasses.overdue
                        : p.status === 'pending'
                        ? dateBadgeClasses.warning
                        : dateBadgeClasses.neutral
                    }`}
                  >
                    {p.status === 'overdue' && <FaExclamationTriangle />}
                    {extractDate(p.due_date ?? '') || '—'}
                  </span>
                </td>
                <td className="p-3 text-gray-800">
                  {extractDate(p.payment_date ?? '') || '—'}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      statusClasses[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => handleEdit(p)}
                      className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Excluir"
                      onClick={() => deletePayable(p.id)}
                      className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPayable && (
        <NewPayableModal
          isOpen={!!editingPayable}
          onClose={() => {
            setEditingPayable(null);
            fetchPayables();
          }}
          payable={editingPayable}
        />
      )}
    </section>
  );
};

export default PayablesTable;
