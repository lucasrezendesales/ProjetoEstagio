'use client';

import Sidebar from '@/components/layout/Sidebar';
import MainHeader from '@/components/layout/MainHeader';
import SummaryCard from '@/components/layout/SummaryCard';
import PayablesTable from '@/components/Payables/PayablesTable';
import NewPayableModal from '@/components/Payables/NewPayableModal';
import ControlSection from '@/components/ui/ControlSection';
import { usePayablesSummary } from '@/hooks/usePayablesSummary';
import useModal from '@/hooks/useModal';

export default function PayablesPage() {
  const { summary, loading } = usePayablesSummary();

  const newPayableModal = useModal('newPayable');

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeItem="payables" />

      <main className="flex-1 bg-gray-50">
        <MainHeader title="Contas a Pagar" />

        <div className="p-6">
          <ControlSection onNewClick={newPayableModal.openModal} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <SummaryCard
              title="Pendentes"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.pending.totalAmount ?? 0)
              }
              change={loading ? '...' : `${summary?.pending.count ?? 0} contas`}
              changeType="negative"
              icon="exclamation-circle"
              iconBg="bg-yellow-500"
            />
            <SummaryCard
              title="Vencidas"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.overdue.totalAmount ?? 0)
              }
              change={loading ? '...' : `${summary?.overdue.count ?? 0} contas`}
              changeType="negative"
              icon="clock"
              iconBg="bg-red-500"
            />
            <SummaryCard
              title="Pagas (30 dias)"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.paid.totalAmount ?? 0)
              }
              change={loading ? '...' : `${summary?.paid.count ?? 0} contas`}
              changeType="positive"
              icon="check-circle"
              iconBg="bg-green-500"
            />
            <SummaryCard
              title="Agendadas"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.scheduled.totalAmount ?? 0)
              }
              change={
                loading ? '...' : `${summary?.scheduled.count ?? 0} contas`
              }
              changeType="neutral"
              icon="calendar-check"
              iconBg="bg-blue-500"
            />
          </div>

          <PayablesTable />
        </div>
      </main>

      <NewPayableModal
        isOpen={newPayableModal.isOpen}
        onClose={newPayableModal.closeModal}
      />
    </div>
  );
}
