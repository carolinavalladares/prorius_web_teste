import { IUser } from "../types";

export const omitPassword = (user: IUser) => {
  const { id, name, email, role, created_at, deleted } = user;
  return { id, name, email, role, created_at, deleted };
};
