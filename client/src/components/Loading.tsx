import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center text-blue-950 text-sm">
      <Loader className="animate-spin duration-1000" size={32} />
      <span className="font-semibold">Carregando...</span>
    </div>
  );
};

export default Loading;
