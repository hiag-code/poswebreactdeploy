import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute() {
  const { logado } = useAuth();


  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}