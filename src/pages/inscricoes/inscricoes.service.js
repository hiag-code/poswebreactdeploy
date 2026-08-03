import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const criarInscricao = async (dados) => {
    const response = await api.post("/inscricoes", dados);
    return response.data;
};

export const buscarInscricoes = async () => {
    const response = await api.get("/inscricoes");
    return response.data;
};

export const buscarInscricaoPorId = async (id) => {
    const response = await api.get(`/inscricoes/${id}`);
    return response.data;
};

export const atualizarInscricao = async (id, dados) => {
    const response = await api.patch(`/inscricoes/${id}`, dados);
    return response.data;
};

export const excluirInscricao = async (id) => {
    await api.delete(`/inscricoes/${id}`);
    return true;
};
