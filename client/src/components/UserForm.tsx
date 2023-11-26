import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../../services/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOffIcon } from "lucide-react";

interface IFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFields> = async (data) => {
    const userData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
      role: data.role.trim(),
    };

    const resp = await registerUser(userData);

    toast.success(resp && resp.data.message);

    navigate("/");
  };

  const togglePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.currentTarget as HTMLButtonElement;

    const input = target.parentElement?.children[0] as HTMLInputElement;

    if (!input) {
      return;
    }

    if (input.type == "password") {
      input.type = "text";

      target.children[0].classList.add("absolute", "invisible");
      target.children[1].classList.remove("absolute", "invisible");
    } else {
      input.type = "password";

      target.children[0].classList.remove("absolute", "invisible");
      target.children[1].classList.add("absolute", "invisible");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md">
      <div className="flex flex-col mb-4 relative">
        {/* nome */}
        <label className="text-sm font-semibold mb-1" htmlFor="name">
          Nome:
        </label>
        <input
          {...register("name", { required: true })}
          className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950 text-sm  ${
            errors.name && "border-rose-500"
          }`}
          type="text"
        />

        {errors.name?.type === "required" && (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            Este campo é obrigatório
          </p>
        )}
      </div>

      {/* email */}
      <div className="flex flex-col mb-4 relative">
        <label className="text-sm font-semibold mb-1" htmlFor="email">
          Email:
        </label>
        <input
          className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950 text-sm ${
            errors.email && "border-rose-500"
          }`}
          type="email"
          {...register("email", { required: true })}
        />

        {errors.email?.type === "required" && (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            Este campo é obrigatório
          </p>
        )}
      </div>

      {/* senha */}
      <div className="flex flex-col mb-4 relative">
        <label className="text-sm font-semibold mb-1" htmlFor="password">
          Senha:
        </label>
        <div className="relative">
          <input
            className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950 text-sm w-full ${
              errors.password && "border-rose-500"
            }`}
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
            })}
          />
          <button
            title="Mostrar/Esconder senha"
            type="button"
            onClick={(e) => togglePasswordVisibility(e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Eye className="" size={16} />
            <EyeOffIcon className="invisible absolute" size={16} />
          </button>
        </div>

        {errors.password?.type === "required" ? (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            Este campo é obrigatório
          </p>
        ) : errors.password?.type === "minLength" ? (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            A senha deve ter no mínimo 6 caracteres
          </p>
        ) : errors.password?.type === "pattern" ? (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            A senha deve conter pelo menos um número, uma letra e um caracter
            especial
          </p>
        ) : null}
      </div>

      {/* confirmar senha */}
      <div className="flex flex-col mb-4 relative">
        <label className="text-sm font-semibold mb-1" htmlFor="confirmPassword">
          Confirmar senha:
        </label>
        <div className="relative">
          <input
            className={`border border-gray-200 h-9 px-4  outline-none focus:border-blue-950 text-sm w-full ${
              errors.confirmPassword && "border-rose-500"
            }`}
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value, formValues) => value === formValues.password,
            })}
          />
          <button
            title="Mostrar/Esconder senha"
            type="button"
            onClick={(e) => togglePasswordVisibility(e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Eye className="" size={16} />
            <EyeOffIcon className="invisible absolute" size={16} />
          </button>
        </div>

        {errors.confirmPassword?.type === "required" ? (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            Este campo é obrigatório
          </p>
        ) : errors.confirmPassword?.type === "validate" ? (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            O valor deste campo deve ser igual ao valor do campo senha
          </p>
        ) : null}
      </div>

      {/* função do usuário */}
      <fieldset className="relative">
        <legend className="text-sm font-semibold mb-2">
          Função do usuário:
        </legend>

        <div className="flex items-center justify-start gap-1 mb-1">
          <input
            className="accent-blue-950 outline-blue-950"
            type="radio"
            {...register("role", { required: true })}
            id="user"
            value="USER"
          />
          <label className="text-sm font-medium" htmlFor="user">
            Usuário
          </label>
        </div>
        <div className="flex items-center justify-start gap-1 mb-1">
          <input
            className="accent-blue-950 outline-blue-950 "
            type="radio"
            {...register("role", { required: true })}
            id="admin"
            value="ADMIN"
          />
          <label className="text-sm font-medium" htmlFor="admin">
            Admin
          </label>
        </div>

        {errors.role?.type === "required" && (
          <p className="text-xs text-red-500 font-medium absolute -bottom-4">
            Este campo é obrigatório
          </p>
        )}
      </fieldset>

      <button
        title="Cadastrar usuário"
        className="p-2 bg-blue-950 text-white text-sm font-semibold ml-auto mr-0 flex outline-none  focus:bg-blue-900 hover:bg-blue-900 transition-all "
      >
        Cadastrar
      </button>
    </form>
  );
};

export default UserForm;
