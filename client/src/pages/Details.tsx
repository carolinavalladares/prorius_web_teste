import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUser } from "../types";
import { fetchUser } from "../../services/UserApi";
import { formatDate } from "../utils/formatDate";

const Details = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await fetchUser(Number(userId));

    setUser(data.user);
  };

  return (
    <div>
      {user && (
        <div className="bg-white shadow-sm p-4">
          <h1 className="text-lg font-semibold mb-2">{user.name}</h1>

          <p className="leading-none text-sm flex gap-1 flex-col mb-2">
            <span className="font-medium">E-mail:</span>
            {user.email}
          </p>

          <p className="leading-none text-sm flex gap-1 flex-col mb-2">
            <span className="font-medium">Criado em:</span>
            {formatDate(user.created_at)}
          </p>

          <p className="leading-none text-sm flex gap-1 flex-col mb-2">
            <span className="font-medium">Função:</span>
            {user.role == "ADMIN" ? "Administrador" : "Usuário"}
          </p>

          <div className="flex items-center justify-start gap-4 mt-4">
            <button
              title="Editar Usuário"
              className="text-sm px-2 py-1 bg-blue-950 font-semibold text-white"
            >
              Editar
            </button>
            <button
              title="Deletar usuário"
              className="text-sm px-2 py-1 bg-rose-500 font-semibold text-white"
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
