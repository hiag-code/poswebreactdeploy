// src/pages/disciplinas/DisciplinaEditPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDisciplinaPorId, atualizarDisciplina } from "./Disciplinas.service";

export default function DisciplinaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarDisciplinaPorId(id);
        setForm(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Erro ao carregar disciplina");
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
      await atualizarDisciplina(id, form);
      alert("Disciplina atualizada com sucesso!");
      navigate("/disciplinas");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar disciplina");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Carregando disciplina...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Disciplina não encontrada</p>
        <button
          onClick={() => navigate('/disciplinas')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Botão voltar */}
      <button
        onClick={() => navigate('/disciplinas')}
        className="mb-4 text-green-600 hover:text-green-800 flex items-center gap-1 transition-colors"
      >
        <span className="text-xl">←</span> Voltar para lista de disciplinas
      </button>

      {/* Card de edição */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cabeçalho verde */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
          <h1 className="text-2xl font-bold">Editar Disciplina</h1>
          <p className="text-sm text-green-100 mt-1">
            Preencha os campos abaixo para editar a disciplina
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Código da Disciplina */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código da Disciplina <span className="text-red-500">*</span>
            </label>
            <input
              name="id"
              value={form.id || ""}
              onChange={handleChange}
              required
              placeholder="Ex: H202"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Código único da disciplina
            </p>
          </div>

          {/* Nome da Disciplina */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Disciplina <span className="text-red-500">*</span>
            </label>
            <input
              name="nome"
              value={form.nome || ""}
              onChange={handleChange}
              required
              placeholder="Ex: Banco de Dados"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Carga Horária */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carga Horária (horas) <span className="text-red-500">*</span>
            </label>
            <input
              name="ch"
              type="number"
              value={form.ch || ""}
              onChange={handleChange}
              required
              min="1"
              placeholder="Ex: 40"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Link do PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link do PDF da Ementa
            </label>
            <input
              name="link"
              value={form.link || ""}
              onChange={handleChange}
              placeholder="Ex: /uploads/disciplinas/em.pdf"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {form.link && (
              <a
                href={form.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:underline mt-1 inline-block"
              >
                Ver PDF atual
              </a>
            )}
          </div>

          {/* Ementa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ementa <span className="text-red-500">*</span>
            </label>
            <textarea
              name="ementa"
              value={form.ementa || ""}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Descreva a ementa da disciplina..."
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Salvando...
                </>
              ) : (
                'Atualizar Disciplina'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/disciplinas')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}