export function salvarSessao(dados) {
  // Pega o token tanto de 'access_token' quanto de 'token'
  const token = dados.access_token || dados.token;
  const usuario = dados.user || dados.usuario;

  if (token) {
    localStorage.setItem("access_token", token);
  }
  
  if (usuario) {
    localStorage.setItem("user", JSON.stringify(usuario));
  }
}

/**
 * Limpa o localStorage ao fazer logout
 */
export function limparSessao() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/**
 * Retorna o Token JWT salvo
 */
export function obterToken() {
  return localStorage.getItem("access_token") || localStorage.getItem("token");
}

/**
 * Retorna o objeto do usuário logado
 */
export function obterUsuario() {
  const user = localStorage.getItem("user");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/**
 * Verifica se existe uma sessão ativa
 */
export function estaAutenticado() {
  return !!obterToken();
}

/**
 * Verifica se o usuário logado possui perfil de Admin
 */
export function isAdmin() {
  const user = obterUsuario();

  // 1. Tenta ler direto do objeto de usuário salvo
  if (user && (user.role === "admin" || user.perfil === "admin")) {
    return true;
  }

  // 2. Se a role/perfil estiver codificada dentro do Token JWT
  const token = obterToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role === "admin" || payload.perfil === "admin";
    } catch {
      return false;
    }
  }

  return false;
}