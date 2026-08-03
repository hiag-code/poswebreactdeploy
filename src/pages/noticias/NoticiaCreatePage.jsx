import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarNoticia } from "./noticias.service";

export default function NoticiaCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    link: "",
    imagem_url: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      // Trata imagem_url vazia como null/opcional
      const payload = {
        ...form,
        imagem_url: form.imagem_url.trim() === "" ? null : form.imagem_url
      };

      await criarNoticia(payload);
      alert("Notícia cadastrada com sucesso!");
      navigate("/noticias");
    } catch (error) {
      console.error("Erro ao criar notícia:", error.response?.data || error.message);
      const detail = error.response?.data?.detail;
      alert(typeof detail === "string" ? detail : "Erro ao cadastrar notícia. Verifique as permissões de Admin.");
    } finally {
      setLoading(false);
    }
  }

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
            Nova Notícia / Edital
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
              placeholder="Ex: Inscrições abertas para o semestre 2026.2"
              value={form.titulo}
              onChange={handleChange}
              required
              minLength={2}
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Link de Acesso / Edital Oficial
            </label>
            <input
              name="link"
              placeholder="https://portal.ifba.edu.br/noticias/edital"
              value={form.link}
              onChange={handleChange}
              required
              minLength={4}
              className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              URL da Imagem de Capa (Opcional)
            </label>
            <input
              name="imagem_url"
              placeholder="https://cdn.exemplo.com/noticias/imagem.jpg"
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
              placeholder="Escreva a descrição detalhada da notícia..."
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
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar Notícia"}
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