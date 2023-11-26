import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUser } from "../types";
import { deleteUser, fetchUser } from "../../services/UserApi";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";

const Details = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (!userId) {
      return;
    }

    const data = await fetchUser(userId);

    setUser(data.user);
  };

  const handleDelete = async () => {
    if (!userId) {
      return;
    }
    const data = await deleteUser(userId);

    toast.success(data.message);

    navigate("/");
  };

  return (
    <div>
      {/* return button */}
      <Link to={"/"}>
        <button className="flex items-center justify-center text-sm text-blue-950 hover:underline focus:underline">
          {" "}
          <ChevronLeft size={16} /> Voltar
        </button>
      </Link>

      {user && (
        <div className="bg-white shadow-sm p-4 mt-2">
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
            <Link to={`/user/${user.id}/edit`}>
              <button
                title="Editar Usuário"
                className="text-xs px-2 py-1 rounded-sm bg-blue-950 font-semibold text-white flex items-center gap-2 justify-center"
              >
                Editar
                <Pencil size={16} />
              </button>
            </Link>

            <button
              onClick={handleDelete}
              title="Deletar usuário"
              className="text-xs px-2 py-1 rounded-sm bg-rose-500 font-semibold text-white flex items-center gap-2 justify-center"
            >
              Deletar
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
