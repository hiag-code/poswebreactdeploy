import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Adiciona o Token de Admin em requisições de Criar, Editar e Excluir
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNoticias = async () => {
  const response = await api.get("/noticias");
  return response.data;
};

export const buscarNoticiaPorId = async (id) => {
  const response = await api.get(`/noticias/${id}`);
  return response.data;
};

export const criarNoticia = async (dados) => {
  const response = await api.post("/noticias", dados);
  return response.data;
};

export const atualizarNoticia = async (id, dados) => {
  // Ajustado para PUT conforme o router
  const response = await api.put(`/noticias/${id}`, dados);
  return response.data;
};

export const excluirNoticia = async (id) => {
  await api.delete(`/noticias/${id}`);
  return true;
};