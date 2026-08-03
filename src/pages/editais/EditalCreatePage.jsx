import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarEdital } from "./editais.service";

export default function EditalCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    link: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarEdital(form);
      alert("Edital cadastrado com sucesso!");
      navigate("/editais");
    } catch (error) {
      console.error("Erro ao criar edital:", error.response?.data || error.message);
      const detail = error.response?.data?.detail;
      alert(typeof detail === "string" ? detail : "Erro ao cadastrar edital. Verifique permissões de Admin.");
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
            onClick={() => navigate('/editais')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-emerald-600">
            Novo Edital
          </h1>
          <div className="w-12"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Título do Edital
            </label>
            <input
              name="titulo"
              placeholder="Ex: Edital 03/2026 — Seleção de Bolsistas"
              value={form.titulo}
              onChange={handleChange}
              required
              minLength={2}
              className="w-full border-2 border-emerald-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Link do Documento / PDF Oficial
            </label>
            <input
              name="link"
              placeholder="https://portal.ifba.edu.br/editais/03-2026.pdf"
              value={form.link}
              onChange={handleChange}
              required
              minLength={4}
              className="w-full border-2 border-emerald-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Descrição / Resumo dos Requisitos
            </label>
            <textarea
              name="descricao"
              placeholder="Descreva as informações principais, prazos e requisitos..."
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
              disabled={loading}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar Edital"}
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