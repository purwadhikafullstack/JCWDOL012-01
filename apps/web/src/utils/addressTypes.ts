export interface UserAddress {
  id: number;
  user_id: number;
  label: string;
  phone: string;
  name: string;
  street: string;
  city: string;
  cityId: number;
  province: number;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}
