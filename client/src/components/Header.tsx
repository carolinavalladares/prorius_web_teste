import { UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-5">
      <div className="max-w-5xl m-auto px-4 flex items-center justify-between lg:px-0">
        <Link to="/">
          <UsersRound />
        </Link>

        <Link title="Cadastrar novo usuário" to={"/cadastrar"}>
          <button className="bg-blue-950 text-white px-2 py-2 flex items-center justify-center gap-2 font-semibold text-xs rounded-sm">
            Cadastrar
            <UserRoundPlus size={18} color="#ffffff" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
