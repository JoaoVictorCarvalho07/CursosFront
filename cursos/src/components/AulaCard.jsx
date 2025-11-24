import { Link } from "react-router-dom";


export default function AulaCard({ aula}) {
  return (
    <Link 
      to={`/aula/${aula.id}`} 
      className="
        bg-gray-800 
        hover:bg-gray-700 
        transition 
        p-4 
        rounded-lg 
        shadow 
        border border-gray-700
        flex 
        justify-between 
        items-center
      "
    >
      
      {/* Nome da aula */}
      <span className="text-white font-medium text-sm">
        {aula.titulo}
      </span>

      {/* Ícone de play */}
      <span className="text-blue-400 text-lg">
        ▶
      </span>

    </Link>
  );
}
