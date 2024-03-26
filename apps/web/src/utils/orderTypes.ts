export interface PaymentList {
  method: string;
  invoice: string;
}

export interface ProductImage {
  url: string;
}

export interface ProductOrderList {
  name: string;
  price: string;
  images: ProductImage[];
}

export interface OrderItem {
  quantity: number;
  product: ProductOrderList;
}

export interface Order {
  id: number;
  user_id: number;
  shipment_id: number;
  voucher_id: null | string;
  total: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  payment: PaymentList[];
  order_Items: OrderItem[];
}

export interface ApiResponse {
  success: boolean;
  result: Order[];
}
