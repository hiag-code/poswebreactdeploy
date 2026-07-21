import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarUsuario } from "./usuarios.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function UsuarioCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    login: "",
    nome: "",
    funcao:"",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarUsuario(form);
      navigate("/usuarios");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
      <h1 className="text-2xl font-bold mb-8 text-center text-green-600">Novo Usuário</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
       <div>
        <Texto_Escuro>Login</Texto_Escuro>
        <input
          name="login"
          placeholder="Login"
          value={form.login}
          onChange={handleChange}
          required
       className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
          />
        </div>

        <div>
        <Texto_Escuro>Nome</Texto_Escuro>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
       className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
          />
        </div>

        <div>
        <Texto_Escuro>E-mail</Texto_Escuro>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
          />
      
        </div>

        <div>
        <Texto_Escuro>Perfil</Texto_Escuro>
        <input
          name="perfil"
          placeholder="Perfil"
          value={form.perfil}
          onChange={handleChange}
          required
        className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
          />
        
        </div>

        <div>
        <Texto_Escuro>Senha</Texto_Escuro>
        <input
          name="senha"
          placeholder="Senha"
          value={form.senha}
          type="password"
          onChange={handleChange}
          required
        className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
          />
      
        </div>

        <div className="flex gap-6">

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
            <button className="w-full bg-green-600 text-white py-2 rounded"
        onClick={() => navigate('/usuarios')}
        >
          Retornar </button></div>
      </form>
    </div></div>
  );
}