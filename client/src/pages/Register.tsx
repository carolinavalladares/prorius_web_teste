import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import { ChevronLeft } from "lucide-react";

const Register = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Cadastrar novo usuário</h1>

      {/* return button */}
      <Link to={`/`}>
        <button className="flex items-center justify-center text-sm text-blue-950 hover:underline focus:underline">
          {" "}
          <ChevronLeft size={16} /> Voltar
        </button>
      </Link>

      <div className="mt-2">
        <UserForm />
      </div>
    </div>
  );
};

export default Register;
