// src/hooks/usePrintTable.ts
export const usePrintTable = () => {
  const print = (elementId: string) => {
    const printContent = document.getElementById(elementId);
    if (!printContent) {
      alert('Elemento de impressão não encontrado.');
      return;
    }

    const win = window.open('', '', 'width=900,height=700');
    if (!win) return;

    win.document.write('<html><head><title>Imprimir</title>');
    win.document.write(
      '<style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ccc; padding: 8px; }</style>'
    );
    win.document.write('</head><body>');
    win.document.write(printContent.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return { print };
};
