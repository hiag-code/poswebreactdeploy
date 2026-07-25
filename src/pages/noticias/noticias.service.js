import axios from "axios";

const api = axios.create({baseURL: "http://localhost:8000",});

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
    const response = await api.patch(`/noticias/${id}`, dados);
    return response.data;
};

export const excluirNoticia = async (id) => {
<<<<<<< HEAD
    await api.delete(`/noticias/${id}`);
    return true;
}
=======
  await api.delete(`/noticias/${id}`);
  return true;
};
>>>>>>> 742cd94745794052baf896e1903976c05d7220f6
