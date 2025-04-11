// src/hooks/useReceivablesSummary.ts
import { useEffect, useState } from 'react';

interface SummaryData {
  pending: { totalAmount: number; count: number };
  overdue: { totalAmount: number; count: number };
  receivedLast30Days: { totalAmount: number; count: number };
  scheduled: { totalAmount: number; count: number };
}

export function useReceivablesSummary() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/accountreceivable/report/consolidated`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      });
  }, []);

  return { summary, loading };
}
