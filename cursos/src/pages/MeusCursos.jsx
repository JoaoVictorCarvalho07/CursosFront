import { useEffect, useState } from "react";
import { api } from "../api/api";
import CursoCard from "../components/CursoCard";
import Layout from "../components/Layout";

export default function MeusCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/cursos")
      .then(res => {
        setCursos(res.data); // por enquanto, exibe todos
        setLoading(false);
      })
      .catch(err => { 
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Meus Cursos</h1>

      {loading ? (
        <p className="text-gray-400">Carregando cursos...</p>
      ) : cursos.length === 0 ? (
        <p className="text-gray-400">Você ainda não está inscrito em nenhum curso.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map(curso => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </Layout>
  );
}
