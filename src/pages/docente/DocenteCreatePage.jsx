import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarDocente } from "./docente.service";
import Status from "../../components/Status";
import Texto_Escuro from "../../components/TextoEscuro";

const STATUS_LIST = ["Ativo", "Pendente", "Inativo"];

export default function DocenteCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    nome: "",
    email: "",
    status: "Ativo",
    senha: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarDocente(form);
      navigate("/docentes");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao criar docente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10 px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => navigate('/docentes')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-green-600">
            Novo Docente
          </h1>
          <div className="w-12"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Texto_Escuro>Nome Completo</Texto_Escuro>
            <input
              name="nome"
              placeholder="Ex: Prof. Carlos Lima"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>CPF</Texto_Escuro>
            <input
              name="cpf"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>Titulação</Texto_Escuro>
            <input
              name="titulacao"
              placeholder="Ex: Doutor, Mestre, Especialista"
              value={form.titulacao}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>E-mail</Texto_Escuro>
            <input
              type="email"
              name="email"
              placeholder="carlos@ifba.edu.br"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>Senha de Acesso</Texto_Escuro>
            <input
              type="password"
              name="senha"
              placeholder="Senha de acesso"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Docente"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/docentes')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
