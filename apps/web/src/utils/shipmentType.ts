export interface ShippingCost {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

export interface ShippingCostResponse {
  shippingCost: ShippingCost[][];
  addressId: number;
  storeId: number;
}

export interface ShippingDetails {
  address_id: number;
  store_id: number;
  amount: number;
  type: string;
}
