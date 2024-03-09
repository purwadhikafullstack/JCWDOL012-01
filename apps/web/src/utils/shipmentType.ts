interface ShippingCost {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

interface ShippingCostResponse {
  shippingCost: ShippingCost[][];
}
