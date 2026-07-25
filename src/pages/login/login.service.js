import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000"
});



export const fazerLogin = async (email, senha) => {

    const response = await api.post("/login", { email, senha });
    
    return response.data;
};