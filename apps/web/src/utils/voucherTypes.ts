export interface Voucher {
  id: number;
  voucher_code: string;
  product_id: number;
  store_id: number;
  type: string;
  amount: string;
  limit_usage: string;
  expired_at: string;
  createdAt: string;
  updatedAt: string;
}
