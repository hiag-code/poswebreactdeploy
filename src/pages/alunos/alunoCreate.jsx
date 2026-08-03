import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAluno } from "./alunos.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function AlunoCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    data_nascimento: "",
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
      await criarAluno(form);
      alert("Aluno cadastrado com sucesso!");
      navigate("/aluno");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.detail || "Erro ao criar aluno");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-2xl font-bold mb-8 text-center text-green-600">
          Novo Aluno
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Texto_Escuro>Nome</Texto_Escuro>
            <input
              name="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none mt-2"
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
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none mt-2"
            />
          </div>

          <div>
            <Texto_Escuro>Email</Texto_Escuro>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none mt-2"
            />
          </div>

          <div>
            <Texto_Escuro>Data de Nascimento</Texto_Escuro>
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none mt-2"
            />
          </div>

          <div>
            <Texto_Escuro>Senha para Acesso</Texto_Escuro>
            <input
              type="password"
              name="senha"
              placeholder="Senha de acesso"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}