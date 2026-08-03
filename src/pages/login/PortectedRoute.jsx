import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, perfisPermitidos }) {
  const usuarioSalvo = localStorage.getItem("usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // 1. Se não estiver logado, redireciona para o login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  const perfil = usuarioLogado?.tipo?.toLowerCase();

  // 2. Se a rota restringe o perfil e o usuário não se encaixa, volta para a home
  if (perfisPermitidos && !perfisPermitidos.includes(perfil)) {
    return <Navigate to="/" replace />;
  }

  return children;
}