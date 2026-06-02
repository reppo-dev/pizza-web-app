export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "customer" | "admin";
}

export interface IRole {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: "customer" | "admin";
  permission: string;
}

export interface User {
  ID: number;
  name: string;
  image: string | null;
  email: string;
  password: string;
  role: IRole;
}

export interface LoginUser {
  id: string;
  email: string;
  password: string;
}

export interface Variant {
  ID: number;
  type: string;
  price: number;
  pizza_id: number;
}

export interface Pizza {
  ID: number;
  name: string;
  description: string;
  image: string;
  status: string;
  variants: Variant[];
  categories: Category[];
}

export interface CreatePizza {
  name: string;
  description: string;
  image: string;
  status: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Cart {
  ID: number;
  user_id: number;
  items: CartItem[];
  total?: number;
}

export interface CartItem {
  ID: number;
  cart_id: number;
  pizza_id: number;
  pizza: Pizza;
  quantity: number;
  variant_name: string;
  price: number;
}

export interface Address {
  ID: number;
  full_name: string;
  phone: string;
  province: string;
  city: string;
  street: string;
  apartment: string;
  postal_code: string;
  delivery_notes: string;
}

export interface InfoAddress {
  full_name: string;
  phone: string;
  province: string;
  city: string;
  street: string;
  apartment: string;
  postal_code: string;
  delivery_notes: string;
}
