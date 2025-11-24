import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import AulaCard from "../components/AulaCard";

export default function CursoDetalhe() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api.get(`/cursos/${id}`)
      .then(res => {
        console.log(res.data.modulos)
        setCurso(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

if (loading) {
  return (
    <Layout>
      <Loader />
    </Layout>
  );
}

    if (!curso) {
    return (
      <Layout>
        <p className="text-red-400">Curso não encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-4">{curso.titulo}</h1>
      <p className="text-gray-300 mb-8">{curso.descricao}</p>

      {/* Módulos do curso */}
      <div className="flex flex-col gap-6">
        {curso.modulos.map(modulo => (
          <div
            key={modulo.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-5"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {modulo.titulo} 
            </h2>

            {/* Lista de aulas do módulo */}
            <div className="flex flex-col gap-3">
              {modulo.aulas.map(aula => (
                <AulaCard key={aula.id} aula={aula}  />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}