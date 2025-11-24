import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api/api";
import CursoFormModal from "./CursoFormModal";

export default function AdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState(null);

  function carregarCursos() {
    api.get("/cursos")
      .then(res => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    carregarCursos();
  }, []);

  function abrirCriar() {
    setCursoEditando(null);
    setModalAberto(true);
  }

  function abrirEditar(curso) {
    setCursoEditando(curso);
    setModalAberto(true);
  }

  function deletarCurso(id) {
    if (!confirm("Deseja realmente excluir este curso?")) return;

    api.delete(`/cursos/${id}`)
      .then(() => carregarCursos())
      .catch(err => console.error(err));
  }

  return (
    <Layout classes={"flex-col"}>
      <div className="flex justify-between mb-6  max-w-screen min-w-full">
        <h1 className="text-3xl font-bold">Gerenciar Cursos</h1>


        <div className="pr-20">
        <button
          onClick={abrirCriar}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 transition w-full h-full "
        >
          + Novo Curso
        </button>
        </div>

      </div>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <table className="w-full bg-gray-900 border border-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id} className="border-t border-gray-800">
                <td className="p-3">{curso.id}</td>
                <td className="p-3">{curso.titulo}</td>
                <td className="p-3">{curso.descricao}</td>
                <td className="p-3">{curso.categoria}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => abrirEditar(curso)}
                    className="text-blue-400 hover:underline mr-4"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarCurso(curso.id)}
                    className="text-red-400 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalAberto && (
        <CursoFormModal
          fechar={() => setModalAberto(false)}
          recarregar={carregarCursos}
          curso={cursoEditando}
        />
      )}
    </Layout>
  );
}
