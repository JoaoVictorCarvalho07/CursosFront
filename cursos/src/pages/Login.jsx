import { use, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

  const {login} = useAuth()
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {

      const res = await api.post("/auth/login", { email, senha });

      console.log(res)
      login(res.data.token, res.data);
      if(res.data.token){
      navigate("/cursos");
    }

    } catch (err) {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl text-white mb-6 text-center">
          Entrar
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
          onChange={e => setSenha(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-3 rounded text-white"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
