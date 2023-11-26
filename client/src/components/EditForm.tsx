import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/UserApi";
import { IEditInitialValues } from "../types";

interface IFields {
  name: string;
  email: string;
  role: string;
}

interface IProps {
  initialValues: IEditInitialValues;
}

const EditForm = ({ initialValues }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFields>({
    defaultValues: initialValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFields> = async (data) => {
    const userData = {
      name: data.name.trim(),
      email: data.email.trim(),
      role: data.role.trim(),
      id: initialValues.id,
    };
    const resp = await editUser(userData);

    toast.success(resp.message);

    navigate(`/user/${initialValues.id}`);
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
        title="Salvar alterações"
        className="p-2 bg-blue-950 text-white text-sm font-semibold ml-auto mr-0 flex outline-none  focus:bg-blue-900 hover:bg-blue-900 transition-all "
      >
        Salvar
      </button>
    </form>
  );
};

export default EditForm;
