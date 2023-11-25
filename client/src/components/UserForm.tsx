import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInitialValues } from "../types";
import { registerUser } from "../../services/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IProps {
  initialValues?: IFormInitialValues;
}

interface IFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const UserForm = ({ initialValues }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFields>({
    defaultValues: initialValues && initialValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFields> = async (data) => {
    const resp = await registerUser(data);

    toast.success(resp && resp.data.message);

    navigate("/");
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
          className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950  ${
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
          className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950 ${
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
        <input
          className={`border border-gray-200 h-9 px-4 outline-none focus:border-blue-950 ${
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
            A senha deve conter no mínimo um número, uma letra e um caracter
            especial
          </p>
        ) : null}
      </div>

      {/* confirmar senha */}
      <div className="flex flex-col mb-4 relative">
        <label className="text-sm font-semibold mb-1" htmlFor="confirmPassword">
          Confirmar senha:
        </label>
        <input
          className={`border border-gray-200 h-9 px-4  outline-none focus:border-blue-950 ${
            errors.confirmPassword && "border-rose-500"
          }`}
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value, formValues) => value === formValues.password,
          })}
        />
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

      <button className="p-2 bg-blue-950 text-white text-sm font-semibold ml-auto mr-0 flex outline-none  focus:bg-blue-900 hover:bg-blue-900 transition-all ">
        Cadastrar
      </button>
    </form>
  );
};

export default UserForm;
