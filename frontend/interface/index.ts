export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "customer" | "admin";
}

export interface LoginUser {
  id: string;
  email: string;
  password: string;
}
