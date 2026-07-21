// src/pages/disciplinas/DisciplinaCreatePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarDisciplina } from "./Disciplinas.service";

export default function DisciplinaCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",       
    nome: "",
    ementa: "",
    ch: "",
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
      await criarDisciplina(form);
      alert("Disciplina criada com sucesso!");
      navigate("/disciplinas");
    } catch (error) {
      console.error("Erro ao criar:", error.response?.data || error.message);
      alert("Erro ao criar disciplina");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Botão voltar */}
      <button
        onClick={() => navigate('/disciplinas')}
        className="mb-4 text-green-600 hover:underline flex items-center"
      >
        ← Voltar para lista
      </button>

      {/* Card de criação */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-6">
          <h1 className="text-2xl font-bold">Nova Disciplina</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* CÓDIGO DA DISCIPLINA */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Código da Disciplina <span className="text-red-500">*</span>
            </label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              placeholder="Ex: H202, BD101, WEB01"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Nome da Disciplina <span className="text-red-500">*</span>
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Banco de Dados"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              value={form.ch}
              onChange={handleChange}
              required
              placeholder="Ex: 40"
              min="1"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Link do PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link do PDF da Ementa
            </label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Ex: /uploads/disciplinas/em.pdf"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Ementa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ementa <span className="text-red-500">*</span>
            </label>
            <textarea
              name="ementa"
              value={form.ementa}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Descreva a ementa da disciplina..."
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? "Salvando..." : "Salvar"}
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