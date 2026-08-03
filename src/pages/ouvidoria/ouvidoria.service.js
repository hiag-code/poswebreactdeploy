import axios from "axios";

const api = axios.create({baseURL: "http://localhost:8000"});

export const buscarOuvidorias = async () => {
    const response = await api.get("/ouvidorias");
    return response.data;
}

export const buscarOuvidoriaPorId = async (id) => {
  const response = await api.get(`/ouvidorias/${id}`);
  return response.data;
};

export const criarOuvidoria = async (dados) => {
  const response = await api.post("/ouvidorias", dados);
  return response.data;
};

export const atualizarOuvidoria = async (id, dados) => {
  const response = await api.patch(`/ouvidorias/${id}`, dados);
  return response.data;
};

export const excluirOuvidoria = async (id) => {
  await api.delete(`/ouvidorias/${id}`);
  return true;
};
