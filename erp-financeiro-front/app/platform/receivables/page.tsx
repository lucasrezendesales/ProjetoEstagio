'use client';
import Sidebar from '@/components/layout/Sidebar';
import MainHeader from '@/components/layout/MainHeader';
import SummaryCard from '@/components/layout/SummaryCard';
import ReceivablesTable from '@/components/Receivables/ReceivablesTable';
import NewReceivableModal from '@/components/Receivables/NewReceivableModal';
import ControlSection from '@/components/ui/ControlSection';
import { useReceivablesSummary } from '@/hooks/useReceivablesSummary';
import useModal from '@/hooks/useModal';

export default function ReceivablesPage() {
  const { summary, loading } = useReceivablesSummary();

  const newReceivableModal = useModal('newReceivable');

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeItem="receivables" />

      <main className="flex-1 bg-gray-50">
        <MainHeader title="Contas a Receber" />

        <div className="p-6">
          <ControlSection onNewClick={newReceivableModal.openModal} />
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
              icon="clock"
              iconBg="bg-green-700"
            />
            <SummaryCard
              title="Vencidos"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.overdue.totalAmount ?? 0)
              }
              change={loading ? '...' : `${summary?.overdue.count ?? 0} contas`}
              changeType="negative"
              icon="exclamation-circle"
              iconBg="bg-red-500"
            />
            <SummaryCard
              title="Recebidos (30 dias)"
              value={
                loading
                  ? 'Carregando...'
                  : formatCurrency(summary?.receivedLast30Days.totalAmount ?? 0)
              }
              change={
                loading
                  ? '...'
                  : `${summary?.receivedLast30Days.count ?? 0} contas`
              }
              changeType="positive"
              icon="check-circle"
              iconBg="bg-green-500"
            />
            <SummaryCard
              title="Agendados"
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

          <ReceivablesTable />
        </div>
      </main>

      <NewReceivableModal
        isOpen={newReceivableModal.isOpen}
        onClose={newReceivableModal.closeModal}
      />
    </div>
  );
}
