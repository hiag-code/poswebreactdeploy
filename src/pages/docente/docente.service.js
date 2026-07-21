import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const buscarDocentes = async () => {
  const response = await api.get("/docentes");
  return response.data;
};

export const buscarDocentePorCodigo = async (id) => {
  const response = await api.get(`/docentes/${id}`);
  return response.data;
};

export const criarDocente = async (dados) => { 
  const response = await api.post("/docentes", dados);
  return response.data;
};

export const atualizarDocente = async (id, dados) => {
  const response = await api.patch(`/docentes/${id}`, dados);
  return response.data;
}; 

export const excluirDocente = async (id) => {
  await api.delete(`/docentes/${id}`);
  return true;
};