export interface IUserData {
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

export interface IUserEdit {
  name: string;
  email: string;
  role: string;
}
