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
  ID: number; // عددی هست، نه رشته
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
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
  pizza?: Pizza;
}

export interface Pizza {
  ID: number;
  name: string;
  description: string;
  image: string;
  status: string;
  variants?: Variant[];
}
