import Layout from "../components/Layout";

export default function Perfil() {
  const nome = localStorage.getItem("nome");
  const email = localStorage.getItem("email");

  return (
    <Layout>
      <div className="max-w-lg bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
        <h1 className="text-3xl font-bold mb-4">Seu Perfil</h1>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Nome:</p>
          <p className="text-white text-lg">{nome}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Email:</p>
          <p className="text-white text-lg">{email}</p>
        </div>

        {/* espaço futuro para editar */}
        <div className="mt-6 italic text-gray-400">
          Em breve: alterar senha, foto de perfil, preferências...
        </div>
      </div>
    </Layout>
  );
}
