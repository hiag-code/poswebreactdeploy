import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarEditalPorId, atualizarEdital } from "./editais.service";

export default function EditalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscarEditalPorId(id);
        setForm({
          titulo: data.titulo || "",
          descricao: data.descricao || "",
          link: data.link || ""
        });
      } catch (error) {
        console.error("Erro ao carregar edital:", error);
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
      await atualizarEdital(id, form);
      alert("Edital atualizado com sucesso!");
      navigate("/editais");
    } catch (error) {
      console.error("Erro ao atualizar edital:", error.response?.data || error.message);
      alert("Erro ao atualizar edital.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6 text-center text-gray-600 font-medium">Carregando edital...</p>;
  if (!form) return <p className="p-6 text-center text-red-500 font-medium">Edital não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => navigate('/editais')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-emerald-600">
            Editar Edital #{id}
          </h1>
          <div className="w-12"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Título
            </label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              minLength={2}
              className="w-full border-2 border-emerald-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Link do Documento / PDF
            </label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              required
              minLength={4}
              className="w-full border-2 border-emerald-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
              minLength={2}
              rows={6}
              className="w-full border-2 border-emerald-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Atualizar Edital"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/editais')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}