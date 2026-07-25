import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarAlunoPorMatricula, atualizarAluno } from "./alunos.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function AlunoEdit() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarAlunoPorMatricula(matricula);
        setForm(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [matricula]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await atualizarAluno(matricula, form);
      navigate("/aluno");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar aluno");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Aluno não encontrado.</p>;

  return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
    
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
    
          <h1 className="text-2xl font-bold mb-8 text-center text-green-600">
            Editar Aluno
          </h1>
    
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Texto_Escuro>Matrícula</Texto_Escuro>
              <input
                name="matricula"
                value={form.matricula}
                onChange={handleChange}
                disabled
                className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              />
            </div>
    
            <div>
              <Texto_Escuro>Nome</Texto_Escuro>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              />
            </div>
    
            <div>
              <Texto_Escuro>Email</Texto_Escuro>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              />
            </div>

             <div>
              <Texto_Escuro>Data Matrícula</Texto_Escuro>
              <input
                name="data"
                value={form.data}
                onChange={handleChange}
                className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              />
            </div>
    
            <div>
              <Texto_Escuro>Status</Texto_Escuro>
              <input
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              />
            </div>
    
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
    
          </form>
        </div>
      </div>
    );
    }
        