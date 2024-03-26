export type PaymentMethod =
  | 'Transfer_Manual'
  | 'va_mandiri'
  | 'va_bca'
  | 'va_bri';

export interface Payment {
  id: number;
  invoice: string;
  user_id: number;
  order_id: number;
  total: string;
  method: string;
  status: string;
  expired_at: string;
  shipped_at: string;
  createdAt: string;
  updatedAt: string;
}
