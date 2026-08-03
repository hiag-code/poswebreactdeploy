import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDocentePorCodigo, atualizarDocente } from "./docente.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function DocenteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarDocentePorCodigo(id);
        setForm(data);

      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      
      const payload = {
        nome: form.nome,
        cpf: form.cpf,
        titulacao: form.titulacao,
        email: form.email
      };

      await atualizarDocente(id, payload);
      alert("Docente atualizado com sucesso!");
      navigate("/docentes");
    } catch (error) {
      console.error("Erro na atualização:", error.response?.data || error.message);
      const msg = error.response?.data?.detail;
      alert(typeof msg === "string" ? msg : "Erro ao atualizar docente.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Docente não encontrado.</p>;

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
            Editar Docente
          </h1>
          <div className="w-12"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Texto_Escuro>Código / ID</Texto_Escuro>
            <input
              name="id"
              value={form.id || id || ""}
              disabled
              className="w-full border-2 border-gray-300 bg-gray-100 p-3 rounded-xl mt-1 cursor-not-allowed text-gray-500"
            />
          </div>

          <div>
            <Texto_Escuro>Nome Completo</Texto_Escuro>
            <input
              name="nome"
              value={form.nome || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>CPF</Texto_Escuro>
            <input
              name="cpf"
              value={form.cpf || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div>
            <Texto_Escuro>Titulação</Texto_Escuro>
            <input
              name="titulacao"
              value={form.titulacao || ""}
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
              value={form.email || ""}
              onChange={handleChange}
              required
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Atualizar Docente"}
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