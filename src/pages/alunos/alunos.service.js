import axios from "axios";

// Criamos a instância direta sem depender do login.service
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Passa o token se o usuário estiver logado
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const listar_alunos = async () => {
  const response = await api.get("/alunos");
  return response.data;
};

export const buscar_aluno = async (id) => {
  const response = await api.get(`/alunos/${id}`);
  return response.data;
};

export const criarAluno = async (dados) => {
  const response = await api.post("/alunos", dados);
  return response.data;
};

export const atualizarAluno = async (id, dados) => {
  const response = await api.put(`/alunos/${id}`, dados);
  return response.data;
};

export const excluirAluno = async (id) => {
  await api.delete(`/alunos/${id}`);
  return true;
};