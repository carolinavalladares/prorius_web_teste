import { useEffect, useState } from "react";
import { IUser } from "../types";
import { fetchUser } from "../../services/UserApi";
import { Link, useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { ChevronLeft } from "lucide-react";
import Loading from "../components/Loading";

const Edit = () => {
  const { userId } = useParams();
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
  return (
    <div>
      {user ? (
        <>
          <h1 className="text-lg font-semibold mb-2">Editar Usuário</h1>

          {/* return button */}
          <Link to={`/user/${user.id}`}>
            <button className="flex items-center justify-center text-sm text-blue-950 hover:underline focus:underline">
              {" "}
              <ChevronLeft size={16} /> Voltar
            </button>
          </Link>

          <div className="mt-2">
            <EditForm
              initialValues={{
                name: user.name,
                email: user.email,
                role: user.role,
                id: user.id,
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Edit;
