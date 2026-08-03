// src/services/login.service.js (ou o caminho onde fica seu arquivo)
import axios from "axios";

export const realizarLogin = async (email, senha) => {
  const response = await axios.post("http://localhost:8000/login", {
    email: email,
    senha: senha,
  });

  const token = response.data.access_token || response.data.token;
  const data = response.data;

  if (token) {
    localStorage.setItem("token", token);
    console.log("Token salvo no LocalStorage com sucesso!");
  }

  const usuario = data.usuario || {
    nome: data.nome || email,
    email: email,
    tipo: data.tipo || data.perfil || data.role || "estudante", 
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));

  return data;
};