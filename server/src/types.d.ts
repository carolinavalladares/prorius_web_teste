export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  deleted: boolean;
  role: string;
}
