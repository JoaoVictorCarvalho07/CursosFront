import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api/api";
import ModuloFormModal from "./ModuloFormModal";

export default function AdminModulos() {
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [carregandoCursos, setCarregandoCursos] = useState(true);
  const [carregandoModulos, setCarregandoModulos] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [moduloEditando, setModuloEditando] = useState(null);

  // Carregar lista de cursos
  useEffect(() => {
    api.get("/cursos")
      .then(res => {
        setCursos(res.data);
        setCarregandoCursos(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Carregar módulos ao selecionar curso
  function carregarModulos(id) {
    setCursoId(id);
    setCarregandoModulos(true);

    api.get(`/cursos/${id}`)
      .then(res => {
        setModulos(res.data.modulos);
        setCarregandoModulos(false);
      })
      .catch(err => console.error(err));
  }

  function abrirCriar() {
    setModuloEditando(null);
    setModalAberto(true);
  }

  function abrirEditar(modulo) {
    setModuloEditando(modulo);
    setModalAberto(true);
  }

  function deletarModulo(id) {
    if (!confirm("Tem certeza que deseja excluir este módulo?")) return;

    api.delete(`/modulos/${id}`)
      .then(() => carregarModulos(cursoId))
      .catch(err => console.error(err));
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Módulos</h1>

      {/* Selecionar Curso */}
      <div className="mb-6">
        <label className="text-gray-300 block mb-2">Selecione um curso:</label>
        <select
          className="bg-gray-800 p-3 rounded border border-gray-700 w-full max-w-lg"
          onChange={e => carregarModulos(e.target.value)}
        >
          <option value="">Escolha um curso...</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.id}>{curso.titulo}</option>
          ))}
        </select>
      </div>

      {carregandoModulos ? (
        <p className="text-gray-400">Carregando módulos...</p>
      ) : (
        cursoId && (
          <>
            {/* Botão Criar */}
            <div className="flex justify-end mb-4">
              <button
                onClick={abrirCriar}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 transition"
              >
                + Novo Módulo
              </button>
            </div>

            {/* Tabela */}
            <table className="w-full bg-gray-900 border border-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Título</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>

              <tbody>
                {modulos.map(modulo => (
                  <tr key={modulo.id} className="border-t border-gray-800">
                    <td className="p-3">{modulo.id}</td>
                    <td className="p-3">{modulo.titulo}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => abrirEditar(modulo)}
                        className="text-blue-400 hover:underline mr-4"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => deletarModulo(modulo.id)}
                        className="text-red-400 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      )}

      {modalAberto && (
        <ModuloFormModal
          fechar={() => setModalAberto(false)}
          cursoId={cursoId}
          modulo={moduloEditando}
          recarregar={() => carregarModulos(cursoId)}
        />
      )}
    </Layout>
  );
}
