import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IUser } from "../types";

import { toast } from "react-toastify";
import { restoreUser } from "../../services/UserApi";

interface IProps {
  user: IUser;
  getDeletedUsers: () => Promise<void>;
}

const UserCard = ({ user, getDeletedUsers }: IProps) => {
  const { name, email, role, id } = user;

  const handleRestoreUser = async () => {
    const data = await restoreUser(id);

    toast.success(data.message);
    await getDeletedUsers();
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded-sm relative">
      <div>
        <p className="font-semibold leading-none mb-1 capitalize">{name}</p>
        <p className="text-sm leading-none text-gray-500">{email}</p>

        {user.deleted ? (
          <button
            onClick={handleRestoreUser}
            title="Restaurar usuário"
            className="text-xs px-2 py-1 bg-rose-500 font-semibold text-white rounded-sm mt-3"
          >
            Restaurar
          </button>
        ) : (
          <Link title="Mais detalhes" to={`/user/${id}`}>
            <button className="ml-auto mr-0 flex text-sm items-center justify-between gap-1 transition-all hover:gap-2 hover:pr-1">
              Mais detalhes
              <ChevronRight size={16} />
            </button>
          </Link>
        )}
      </div>
      {role == "ADMIN" ? (
        <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-semibold px-2 py-1">
          {role}
        </span>
      ) : null}
    </div>
  );
};

export default UserCard;
