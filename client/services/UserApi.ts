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
