import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      <p className="text-gray-300 mb-8">
        Bem-vindo ao painel do administrador. Escolha abaixo o que deseja gerenciar:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/admin/cursos"
          className="bg-gray-800 hover:bg-gray-700 transition p-6 rounded-xl border border-gray-700 shadow flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold text-white">Gerenciar Cursos</h2>
          <p className="text-gray-400 text-sm">Criar, editar e remover cursos.</p>
        </Link>

        <Link
          to="/admin/modulos"
          className="bg-gray-800 hover:bg-gray-700 transition p-6 rounded-xl border border-gray-700 shadow flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold text-white">Gerenciar Módulos</h2>
          <p className="text-gray-400 text-sm">Associar módulos aos cursos.</p>
        </Link>

        <Link
          to="/admin/aulas"
          className="bg-gray-800 hover:bg-gray-700 transition p-6 rounded-xl border border-gray-700 shadow flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold text-white">Gerenciar Aulas</h2>
          <p className="text-gray-400 text-sm">Criar aulas e enviar vídeos.</p>
        </Link>

      </div>
    </Layout>
  );
}
