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
  role: IRole; // آبجکت کامل
}

export interface LoginUser {
  id: string;
  email: string;
  password: string;
}
