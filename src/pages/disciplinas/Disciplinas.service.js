import axios from "axios";

// Cria a instância do Axios
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor: Lê o token do navegador e coloca no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const listar_disciplinas = async () => {
  const response = await api.get("/disciplinas");
  return response.data;
};

export const buscar_disciplina = async (id) => {
  const response = await api.get(`/disciplinas/${id}`);
  return response.data;
};

export const criar_disciplina = async (dados) => {
  const response = await api.post("/disciplinas", dados);
  return response.data;
};

export const atualizar_disciplina = async (id, dados) => {
  const response = await api.put(`/disciplinas/${id}`, dados);
  return response.data;
};

export const excluir_disciplina = async (id) => {
  await api.delete(`/disciplinas/${id}`);
  return true;
};  