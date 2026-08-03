import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscar_aluno, atualizarAluno } from "./alunos.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function AlunoEdit() {
  // Captura a matricula/id que vem da URL
  const { id, matricula } = useParams();
  const alunoId = id || matricula; // Aceita tanto :id quanto :matricula da rota
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscar_aluno(alunoId);
        // Preenche o formulário com os dados reais vindos do banco
        setForm(data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    if (alunoId) {
      carregar();
    }
  }, [alunoId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      
      // Monta apenas o payload com os campos que o FastAPI espera atualizar
      const payload = {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf
      };

      await atualizarAluno(alunoId, payload);
      alert("Aluno atualizado com sucesso!");
      navigate("/aluno");
    } catch (error) {
      console.error("Erro na atualização:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Erro ao atualizar aluno.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6 text-center text-gray-600">Carregando dados do aluno...</p>;
  if (!form) return <p className="p-6 text-center text-red-500">Aluno não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-2xl font-bold mb-8 text-center text-green-600">
          Editar Aluno
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Texto_Escuro>ID / Matrícula</Texto_Escuro>
            <input
              name="id"
              value={form.id || alunoId || ""}
              disabled
              className="w-full border-2 border-gray-300 bg-gray-100 p-3 rounded-xl mt-2 cursor-not-allowed"
            />
          </div>

          <div>
            <Texto_Escuro>Nome</Texto_Escuro>
            <input
              name="nome"
              value={form.nome || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
            />
          </div>

          <div>
            <Texto_Escuro>Email</Texto_Escuro>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
            />
          </div>

          <div>
            <Texto_Escuro>CPF</Texto_Escuro>
            <input
              name="cpf"
              value={form.cpf || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
}