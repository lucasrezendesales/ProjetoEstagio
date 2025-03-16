import Chart from "@/components/dashboard/chart";
import Overview from "@/components/dashboard/overview";
import TransactionsTable from "@/components/dashboard/transactions-table";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Grid principal para gráfico e overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Gráfico - Ocupa 2 colunas em telas maiores */}
        <div className="rounded-xl bg-white shadow-md p-4 md:col-span-2">
          <Chart />
        </div>

        {/* Overview - Ocupa 1 coluna */}
        <div className="rounded-xl bg-white shadow-md p-4">
          <Overview />
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="rounded-xl bg-white shadow-md p-6">
        <TransactionsTable />
      </div>
    </div>
  );
}
