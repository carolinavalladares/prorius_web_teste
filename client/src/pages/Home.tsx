import { useEffect, useState } from "react";
import { fetchDeletedUsers, fetchUsers } from "../../services/UserApi";
import { IUser } from "../types";
import UserCard from "../components/UserCard";
import { ChevronLeft } from "lucide-react";
import Loading from "../components/Loading";

const Home = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [currentTab, setCurrentTab] = useState("all");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (currentTab == "all") {
      getUsers();
    } else {
      getDeletedUsers();
    }
  }, [currentTab]);

  const getUsers = async () => {
    const data = await fetchUsers();

    setUsers(data.users);
  };

  const getDeletedUsers = async () => {
    const data = await fetchDeletedUsers();

    setUsers(data.users);
  };

  const handleChangeTab = () => {
    if (currentTab == "all") {
      setCurrentTab("deleted");
    } else if (currentTab == "deleted") {
      setCurrentTab("all");
    } else {
      setCurrentTab("all");
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Gerenciar usuários</h1>
      <div className="text-sm flex items-end justify-end mb-2">
        {/* return button */}
        <button
          onClick={handleChangeTab}
          className="hover:underline text-blue-950"
        >
          {currentTab == "all" ? (
            "Ver usuários deletados"
          ) : (
            <span className="flex items-center justify-center">
              {" "}
              <ChevronLeft size={16} /> Voltar
            </span>
          )}
        </button>
      </div>

      {users ? (
        <div className="flex flex-col gap-3">
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <UserCard
                  getDeletedUsers={getDeletedUsers}
                  key={user.id}
                  user={user}
                />
              );
            })
          ) : (
            <div className="w-full h-96 text-sm flex items-center justify-center text-gray-500">
              Nenhum usuário até o momento...
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Home;
