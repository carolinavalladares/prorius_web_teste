import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/UserApi";
import { IUser } from "../types";
import UserCard from "../components/UserCard";

const Home = () => {
  const [users, setUsers] = useState<IUser[] | null>();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await fetchUsers();

    setUsers(data.users);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Gerenciar usuários</h1>

      <div className="flex flex-col gap-3">
        {users?.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Home;
