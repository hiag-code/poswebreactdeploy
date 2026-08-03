import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarNoticiaPorId, atualizarNoticia } from "./noticias.service";

export default function NoticiaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscarNoticiaPorId(id);
        setForm({
          titulo: data.titulo || "",
          descricao: data.descricao || "",
          link: data.link || "",
          imagem_url: data.imagem_url || ""
        });
      } catch (error) {
        console.error("Erro ao carregar notícia:", error);
        alert("Erro ao carregar dados da notícia.");
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
        titulo: form.titulo,
        descricao: form.descricao,
        link: form.link,
        imagem_url: form.imagem_url.trim() === "" ? null : form.imagem_url
      };

      await atualizarNoticia(id, payload);
      alert("Notícia atualizada com sucesso!");
      navigate("/noticias");
    } catch (error) {
      console.error("Erro ao atualizar notícia:", error.response?.data || error.message);
      const detail = error.response?.data?.detail;
      alert(typeof detail === "string" ? detail : "Erro ao atualizar notícia.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6 text-center text-gray-600 font-medium">Carregando notícia...</p>;
  if (!form) return <p className="p-6 text-center text-red-500 font-medium">Notícia não encontrada.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => navigate('/noticias')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-green-600">
            Editar Notícia #{id}
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
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Link de Acesso / Edital
            </label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              required
              minLength={4}
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              URL da Imagem de Capa
            </label>
            <input
              name="imagem_url"
              value={form.imagem_url}
              onChange={handleChange}
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Descrição / Conteúdo
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
              minLength={2}
              rows={6}
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Atualizar Notícia"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/noticias')}
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