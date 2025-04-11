export interface AccountReceivable {
  id: number;
  document: string;
  amount: number;
  amount_received?: number;
  issue_date?: string;
  due_date?: string;
  receipt_date?: string;
  status: 'pending' | 'overdue' | 'scheduled' | 'received';
  fk_user_id: number;
  customer?: string;
}
