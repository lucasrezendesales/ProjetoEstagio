export interface AccountPayable {
  id: number;
  document: string;
  amount: number;
  amount_paid?: number;
  issue_date?: string;
  due_date?: string;
  payment_date?: string;
  status: 'pending' | 'overdue' | 'scheduled' | 'paid';
  fk_user_id: number;
  supplier?: string; // campo opcional para exibição
}
