import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  if (!usuario || usuario.role !== "ADMIN") {
    return <Navigate to="/home" />;
  }

  return children;
}
