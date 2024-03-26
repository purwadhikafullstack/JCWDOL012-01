export interface CartItem {
  id: number;
  name: string;
  user_id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  image: string;
  price: string;
}

export interface CreateCartData {
  quantity: number;
  product_id: string;
  store_id: string;
}

export interface CartContextType {
  cart: CartItem[];
  totalCart: number;
  isLoading: boolean;
  isError: boolean;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  refetch: () => void;
}
