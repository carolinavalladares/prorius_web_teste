import axios from "axios";
import { IFormInitialValues } from "../src/types";
import { toast } from "react-toastify";

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/users/list");

    return data;
  } catch (error) {
    return console.error(error);
  }
};
export const fetchDeletedUsers = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/users/list-deleted"
    );

    return data;
  } catch (error) {
    return console.error(error);
  }
};

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
  role,
}: IFormInitialValues) => {
  try {
    const resp = await axios.post("http://localhost:8080/users/register", {
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    return resp;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/users/${id}`);

    return data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:8080/users/delete/${id}`
    );

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const restoreUser = async (id: number) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/users/restore/${id}`
    );

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
