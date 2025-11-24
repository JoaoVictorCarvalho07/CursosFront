import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const navigate = useNavigate();

  async function handleRegister() {
    if (senha !== confirmar) {
      alert("Senhas não coincidem!");
      return;
    }

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (e) {
      alert("Erro ao registrar usuário.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg w-96">
        <h1 className="text-2xl text-white mb-6 text-center">
          Criar conta
        </h1>

        <input
          type="text"
          placeholder="Nome completo"
          className="w-full p-3 rounded mb-3 bg-gray-700 text-white"
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-3 bg-gray-700 text-white"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded mb-3 bg-gray-700 text-white"
          onChange={e => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          className="w-full p-3 rounded mb-4 bg-gray-700 text-white"
          onChange={e => setConfirmar(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 p-3 rounded text-white hover:bg-blue-600"
          onClick={handleRegister}
        >
          Registrar
        </button>

        <p className="text-gray-400 text-center mt-4">
          Já tem conta?{" "}
          <a href="/" className="text-blue-400">Entrar</a>
        </p>
      </div>
    </div>
  );
}
