import { useState } from "react";
import { api } from "../../api/api";

export default function AulaFormModal({ fechar, recarregar, moduloId, aula }) {
  const [titulo, setTitulo] = useState(aula?.titulo || "");
  const [descricao, setDescricao] = useState(aula?.descricao || "");
  const [videoFile, setVideoFile] = useState(null);

  async function salvar(e) {
    e.preventDefault();

    console.log(aula)

    let aulaId = aula?.id;

    let videopath;



    // 1. Criar ou editar aula (sem vídeo ainda)


    if (aula) {
      await api.put(`/aulas/${aula.id}`, {
        titulo,
        descricao,
        moduloId
      });
      aulaId = aula.id;
    } else {
      const res = await api.post("/aulas", {
        titulo,
        descricao,
        moduloId,
        videopath
      });
      aulaId = res.data.id;
    }


            if (videoFile) {
      const formData = new FormData();
      formData.append("file", videoFile);

      videopath= await api.post(`/aulas/${aulaId}/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }





    // 2. Enviar o vídeo se houver arquivo

    recarregar();
    fechar();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {aula ? "Editar Aula" : "Criar Aula"}
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
          />

          <div>
            <label className="block mb-1 text-gray-300">Vídeo (MP4):</label>
            <input
              type="file"
              accept="video/mp4"
              onChange={e => setVideoFile(e.target.files[0])}
              className="text-gray-300"
            />
          </div>

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
