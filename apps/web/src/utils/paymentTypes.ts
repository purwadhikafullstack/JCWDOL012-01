export type PaymentMethod = 'Transfer_Manual' | 'Virtual_Account';

export interface Payment {
  id: number;
  invoice: string;
  user_id: number;
  order_id: number;
  total: string;
  method: string;
  bank: string;
  va_number: string;
  status: string;
  expired_at: string;
  shipped_at: string;
  createdAt: string;
  updatedAt: string;
}
