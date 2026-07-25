import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const buscarUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const buscarUsuarioPorLogin = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const criarUsuario = async (dados) => {
  const response = await api.post("/usuarios", dados);
  return response.data;
};

export const atualizarUsuario = async (id, dados) => {
  const response = await api.patch(`/usuarios/${id}`, dados);
  return response.data;
};

export const excluirUsuario = async (login) => {
  await api.delete(`/usuarios/${login}`);
  return true;
};