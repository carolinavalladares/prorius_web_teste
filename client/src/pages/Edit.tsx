import { useEffect, useState } from "react";
import { IUser } from "../types";
import { fetchUser } from "../../services/UserApi";
import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";

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
          <h1>Editar Usuário</h1>

          <EditForm
            initialValues={{
              name: user.name,
              email: user.email,
              role: user.role,
              id: user.id,
            }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Edit;
