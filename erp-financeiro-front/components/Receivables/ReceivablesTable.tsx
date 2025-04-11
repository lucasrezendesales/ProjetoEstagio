// src/components/ReceivablesTable.tsx
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

import NewReceivableModal from './NewReceivableModal';
import { AccountReceivable } from '@/types/AccountReceivable';
import { extractDate } from '@/utils/date';

const statusClasses = {
  overdue: 'bg-red-50 hover:bg-red-100 text-red-500',
  pending: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-500',
  scheduled: 'bg-blue-50 hover:bg-blue-100 text-blue-500',
  received: 'bg-green-50 hover:bg-green-100 text-green-500',
};

const dateBadgeClasses = {
  overdue: 'bg-red-100 text-red-500',
  warning: 'bg-yellow-100 text-yellow-500',
  neutral: 'bg-gray-100 text-gray-500',
};

const ReceivablesTable = () => {
  const [receivables, setReceivables] = useState<AccountReceivable[]>([]);
  const [editingReceivable, setEditingReceivable] =
    useState<AccountReceivable | null>(null);

  const fetchReceivables = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountreceivable`,
        {}
      );

      const data = await response.json();
      setReceivables(data.data);
    } catch (error) {
      console.error('Erro ao carregar contas a receber:', error);
    }
  };

  const deleteReceivable = async (id: number) => {
    const confirmed = confirm('Deseja realmente excluir este recebimento?');
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/accountreceivable/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setReceivables((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Erro ao excluir recebimento:', err);
    }
  };

  const handleEdit = (receivable: AccountReceivable) => {
    setEditingReceivable(receivable);
  };

  useEffect(() => {
    fetchReceivables();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Contas a Receber
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th>Documento</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Recebimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {receivables.map((r) => (
              <tr key={r.id} className="border-b border-gray-200">
                <td className="p-3 text-gray-800">{r.document}</td>
                <td className="p-3 text-gray-800">{r.customer || '—'}</td>
                <td className="p-3 text-gray-800">
                  R$ {Number(r.amount)?.toFixed(2)}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      r.status === 'overdue'
                        ? dateBadgeClasses.overdue
                        : r.status === 'pending'
                        ? dateBadgeClasses.warning
                        : dateBadgeClasses.neutral
                    }`}
                  >
                    {r.status === 'overdue' && <FaExclamationTriangle />}
                    {extractDate(r.due_date ?? '') || '—'}
                  </span>
                </td>
                <td className="p-3 text-gray-800">
                  {extractDate(r.receipt_date ?? '') || '—'}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      statusClasses[r.status]
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => handleEdit(r)}
                      className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Excluir"
                      onClick={() => deleteReceivable(r.id)}
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

      {editingReceivable && (
        <NewReceivableModal
          isOpen={!!editingReceivable}
          onClose={() => {
            setEditingReceivable(null);
            fetchReceivables();
          }}
          receivable={editingReceivable}
        />
      )}
    </section>
  );
};

export default ReceivablesTable;
