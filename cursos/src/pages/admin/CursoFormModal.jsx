import { useState } from "react";
import { api } from "../../api/api";

export default function CursoFormModal({ fechar, recarregar, curso }) {
  const [titulo, setTitulo] = useState(curso?.titulo || "");
  const [descricao, setDescricao] = useState(curso?.descricao || "");
  const [categoria, setCategoria] = useState(curso?.categoria || "");

  function salvar(e) {
    e.preventDefault();

    const payload = { titulo, descricao, categoria };

    if (curso) {
      api.put(`/cursos/${curso.id}`, payload)
        .then(() => {
          recarregar();
          fechar();
        })
        .catch(err => console.error(err));
    } else {
      api.post("/cursos", payload)
        .then(() => {
          recarregar();
          fechar();
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-lg p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">
          {curso ? "Editar Curso" : "Criar Curso"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={salvar}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="bg-gray-800 p-3 rounded border border-gray-700"
            required
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="bg-gray-800 p-3 rounded border border-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            className="bg-gray-800 p-3 rounded border border-gray-700"
            required
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={fechar}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
