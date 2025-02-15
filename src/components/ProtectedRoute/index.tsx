import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/userAuth";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    toast.info("Usuário não autenticado.");
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
