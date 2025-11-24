import { useState } from "react";
import { api } from "../../api/api";

export default function ModuloFormModal({ fechar, recarregar, cursoId, modulo }) {
  const [titulo, setTitulo] = useState(modulo?.titulo || "");

  function salvar(e) {
    e.preventDefault();

    const payload = { titulo, cursoId };

    if (modulo) {
      api.put(`/modulos/${modulo.id}`, payload)
        .then(() => {
          recarregar();
          fechar();
        })
        .catch(err => console.error(err));
    } else {
      api.post("/modulos", payload)
        .then(() => {
          recarregar();
          fechar();
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 w-full max-w-lg rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">
          {modulo ? "Editar Módulo" : "Criar Módulo"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={salvar}>
          <input
            type="text"
            placeholder="Título do módulo"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
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
