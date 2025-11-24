import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const {logout,usuario} = useAuth()
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 h-16 flex items-center justify-between px-6 shadow-lg">
      
      {/* LOGO / NOME */}




      <Link to="/cursos" className="text-xl font-semibold items-center justify-between">
        PlataformaCursos
      </Link>

      {/* MENU */}
      <div className="flex gap-6 items-center justify-between">

        {usuario?.role != "ADMIN" && (
        <>
            <Link to="/cursos" className="hover:text-blue-400 ">Cursos</Link>
            <Link to="/perfil" className="hover:text-blue-400">Perfil</Link>
            <Link to="/meus-cursos" className="hover:text-blue-400">Meus Cursos</Link>
        </>     
        )}

        {/* Somente admin vê o painel */}
        {usuario?.role === "ADMIN" && (
        <>
            <Link to="/admin/cursos">painel de cursos</Link>
            <Link to="/admin/modulos"> painel de modulos</Link>
            <Link to="/admin/aulas"> painel de aulas</Link>

        </>
        )}
        <button
        onClick={logout}
          className="text-red-400 hover:text-red-300"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
