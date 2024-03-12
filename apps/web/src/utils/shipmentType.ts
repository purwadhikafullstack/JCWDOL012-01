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
  addressId: number;
  storeId: number;
  shippingCost: number;
  shippingType: string;
}
