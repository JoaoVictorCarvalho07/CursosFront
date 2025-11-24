import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function PrivateRoute({ children }) {
  const { autenticado, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return autenticado ? children : <Navigate to="/login" />;
}
