import axios from "axios"

const api =axios.create({baseURL:"http://localhost:8000"});

export const buscarDisciplinas = async() => {
    const response = await api.get("/disciplinas");
    return response.data;
};

export const buscarDisciplinaPorId = async (id) => {
  const response = await api.get(`/disciplinas/${id}`);
  return response.data;
};

export const criarDisciplina = async (dados) => {
  const response = await api.post("/disciplinas", dados);
  return response.data;
};

export const atualizarDisciplina = async (disciplina, dados) => {
  const response = await api.patch(`/disciplinas/${disciplina}`, dados);
  return response.data;
};

export const excluirDisciplina = async (id) => {
  await api.delete(`/disciplinas/${id}`);
  return true;
};