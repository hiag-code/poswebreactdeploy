import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Adiciona o Token JWT de Admin nas requisições protegidas
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const buscarEditais = async () => {
  const response = await api.get("/editais");
  return response.data;
};

export const buscarEditalPorId = async (id) => {
  const response = await api.get(`/editais/${id}`);
  return response.data;
};

export const criarEdital = async (dados) => {
  const response = await api.post("/editais", dados);
  return response.data;
};

export const atualizarEdital = async (id, dados) => {
  const response = await api.put(`/editais/${id}`, dados);
  return response.data;
};

export const excluirEdital = async (id) => {
  await api.delete(`/editais/${id}`);
  return true;
};