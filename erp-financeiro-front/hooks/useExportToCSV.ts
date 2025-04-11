// src/hooks/useExportToCSV.ts
export const useExportToCSV = () => {
  const exportToCSV = (data: any[], filename = 'usuarios.csv') => {
    if (!data || data.length === 0) {
      alert('Nenhum dado para exportar.');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // cabeçalhos
      ...data.map((row) =>
        headers.map((field) => `"${row[field] ?? ''}"`).join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return { exportToCSV };
};
