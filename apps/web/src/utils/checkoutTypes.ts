import { CartItem } from './cartTypes';
import { PaymentMethod } from './paymentTypes';
import { ShippingDetails } from './shipmentType';

export interface CheckoutContextType {
  orderItems: CartItem[];
  voucher: string | null;
  shipment: ShippingDetails;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  addOrderItems: (item: CartItem[]) => void;
  applyVoucher: (voucherId: string) => void;
  setShippingDetails: (details: ShippingDetails) => void;
  selectPaymentMethod: (method: PaymentMethod) => void;
  resetShippingCost: () => void;
}
