import { FaPlus, FaFileExport, FaPrint } from 'react-icons/fa';
import { useExportToCSV } from '@/hooks/useExportToCSV';
import { usePrintTable } from '@/hooks/usePrintTable';

interface ControlSectionProps {
  onNewClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportData?: any[];
  printElementId?: string;
}

const ControlSection = ({
  onNewClick,
  exportData,
  printElementId,
}: ControlSectionProps) => {
  const { exportToCSV } = useExportToCSV();
  const { print } = usePrintTable();
  return (
    <section className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6">
      <div className="flex gap-3 w-full md:w-auto">
        <button
          onClick={onNewClick}
          className="h-9 px-4 bg-green-700 text-white rounded text-sm flex items-center gap-2 hover:bg-green-800 transition-colors"
        >
          <FaPlus />
          Novo
        </button>

        <button
          onClick={() => exportToCSV(exportData || [])}
          className="h-9 px-4 bg-white text-green-700 border border-green-700 rounded text-sm flex items-center gap-2 hover:bg-green-50 transition-colors hidden"
        >
          <FaFileExport />
          Exportar
        </button>

        <button
          onClick={() => print(printElementId || '')}
          className="h-9 px-4 bg-white text-green-700 border border-green-700 rounded text-sm items-center gap-2 hover:bg-green-50 transition-colors hidden"
        >
          <FaPrint />
          Imprimir
        </button>
      </div>
    </section>
  );
};

export default ControlSection;
