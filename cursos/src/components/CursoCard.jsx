import { Link } from "react-router-dom";

export default function CursoCard({ curso }) {

  return (
    <Link
      to={`/curso/${curso.id}`}
      className="
        bg-gray-800 
        hover:bg-gray-700 
        transition 
        p-6 
        rounded-lg 
        shadow-md 
        border border-gray-700
        flex 
        flex-col
        gap-3
      "
    >
      
      {/* Título */}
      <h2 className="text-xl font-semibold text-white">
        {curso.titulo}
      </h2>

      {/* Descrição */}
      <p className="text-gray-300 text-sm line-clamp-3">
        {curso.descricao}
      </p>

    </Link>
  );
}
