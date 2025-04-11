import { useEffect, useState } from 'react';

interface Payable {
  id: number;
  document: string;
  supplier: string;
  amount: number;
  issue_date: string;
  due_date: string;
  payment_date?: string;
  status: string;
  statusLabel?: string;
  bankAccount?: string;
}

interface PaginatedResponse {
  data: Payable[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function usePaginatedPayables(initialPage = 1, initialLimit = 15) {
  const [payables, setPayables] = useState<Payable[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPayables = async (page: number, limit: number) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/accountpayable/paginated?page=${page}&limit=${limit}`);
    const result: PaginatedResponse = await res.json();

    const enriched = result.data.map((item) => ({
      ...item,
      statusLabel:
        item.status === 'paid'
          ? 'Pago'
          : item.status === 'pending'
          ? 'Pendente'
          : item.status === 'overdue'
          ? 'Vencida'
          : item.status === 'scheduled'
          ? 'Agendado'
          : item.status,
    }));

    setPayables(enriched);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayables(page, limit);
  }, [page, limit]);

  return {
    payables,
    total,
    page,
    limit,
    totalPages,
    loading,
    setPage,
    setLimit,
    refetch: () => fetchPayables(page, limit),
  };
}
