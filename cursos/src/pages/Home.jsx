import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  const nome = localStorage.getItem("nome") || "Aluno";

  return (
    <Layout>
      <div className="mt-4">
        <h1 className="text-4xl font-bold mb-4">
          Olá, {nome}! 👋
        </h1>

        <p className="text-gray-300 text-lg mb-6">
          Bem-vindo(a) à plataforma de cursos.  
          Continue seus estudos ou explore novos conteúdos.
        </p>

        <Link
          to="/cursos"
          className="
            inline-block 
            bg-blue-600 
            hover:bg-blue-500 
            transition 
            px-6 py-3 
            rounded-lg 
            text-white 
            font-medium
          "
        >
          Acessar cursos →
        </Link>
      </div>
    </Layout>
  );
}
    