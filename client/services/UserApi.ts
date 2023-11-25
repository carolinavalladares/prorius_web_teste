import axios from "axios";

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/users/list");

    return data;
  } catch (error) {
    return console.error(error);
  }
};
