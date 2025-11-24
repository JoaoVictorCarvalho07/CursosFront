import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsuario = localStorage.getItem("usuario");

    if (savedToken && savedUsuario) {

        console.log(savedUsuario)
      setToken(savedToken);
      setUsuario(JSON.parse(savedUsuario));
    }

    setLoading(false);
  }, []);

  function login(token, usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    location.href = "/"
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        loading,
        login,
        logout,
        autenticado: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
