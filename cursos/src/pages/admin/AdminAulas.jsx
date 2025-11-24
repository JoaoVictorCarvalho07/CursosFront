import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api/api";
import AulaFormModal from "./AulaFormModal";

export default function AdminAulas() {
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [moduloId, setModuloId] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [aulaEditando, setAulaEditando] = useState(null);

  // Carregar cursos
  useEffect(() => {
    api.get("/cursos")
      .then(res => setCursos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Carregar módulos ao escolher curso
  useEffect(() => {
    if (!cursoId) return;
    api.get(`/cursos/${cursoId}`)
      .then(res => setModulos(res.data.modulos))
      .catch(err => console.error(err));
  }, [cursoId]);

  // Carregar aulas ao escolher módulo
  useEffect(() => {
    if (!moduloId) return;
    api.get(`/aulas/modulo/${moduloId}`)
      .then(res => setAulas(res.data))
      .catch(err => console.error(err));
  }, [moduloId]);

  function abrirCriar() {
    setAulaEditando(aulaEditando);
    setModalAberto(true);
  }

  function abrirEditar(aula) {
    setAulaEditando(aula);
    setModalAberto(true);
  }

  function deletarAula(id) {
    if (!confirm("Deseja realmente excluir esta aula?")) return;

    api.delete(`/aulas/${id}`)
      .then(() => {
        api.get(`/aulas/modulo/${moduloId}`)
          .then(res => setAulas(res.data));
      })
      .catch(err => console.error(err));
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Aulas</h1>

      <div className="flex ">
        {/* Selecionar curso */}
      <div className="mb-4 mr-10">
        <label className="block text-gray-300 mb-2">Curso:</label>
        <select
          onChange={e => setCursoId(e.target.value)}
          className="bg-gray-800 p-3 rounded border border-gray-700"
        >
          <option>Selecione...</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.id}>{curso.titulo}</option>
          ))}
        </select>
      </div>

      {/* Selecionar módulo */}
      {cursoId && (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Módulo:</label>
          <select
            onChange={e => setModuloId(e.target.value)}
            className="bg-gray-800 p-3 rounded border border-gray-700"
          >
            <option>Selecione...</option>
            {modulos.map(mod => (
              <option key={mod.id} value={mod.id}>{mod.titulo}</option>
            ))}
          </select>
        </div>
      )}
      </div>

      {/* Botão criar */}
      {moduloId && (
        <div className="flex justify-end mb-4">
          <button
            onClick={abrirCriar}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            + Nova Aula
          </button>
        </div>
      )}

      {/* Tabela de aulas */}
      {moduloId && (
        <table className="w-full bg-gray-900 border border-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {aulas.map(aula => (
              <tr key={aula.id} className="border-t border-gray-800">
                <td className="p-3">{aula.id}</td>
                <td className="p-3">{aula.titulo}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => abrirEditar(aula)}
                    className="text-blue-400 hover:underline mr-4"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarAula(aula.id)}
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

      {/* Modal */}
      {modalAberto && (
        <AulaFormModal
          fechar={() => setModalAberto(false)}
          recarregar={() =>
            api.get(`/aulas/modulo/${moduloId}`).then(res => setAulas(res.data))
          }
          moduloId={moduloId}
          aula={aulaEditando}
        />
      )}
    </Layout>
  );
}
