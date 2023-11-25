export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  deleted: boolean;
  role: string;
}
