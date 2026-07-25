// src/pages/disciplinas/disciplinaVisualizar.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDisciplinaPorId } from "./Disciplinas.service";
import Texto_Escuro from "../../components/TextoEscuro";
import Titulo_Escuro from "../../components/TituloEscuro";

export default function DisciplinaVisualizar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDisciplina() {
      try {
        setLoading(true);
        
        const disciplinaData = await buscarDisciplinaPorId(id);
        setDisciplina(disciplinaData);
      } catch (error) {
        console.error("Erro ao buscar disciplina:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDisciplina();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Carregando disciplina...</div>;
  }

  if (!disciplina) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Disciplina não encontrada</p>
        <button 
          onClick={() => navigate('/disciplinas')}
          className="bg-green-500 text-white px-6 py-4 rounded"
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
        className="mb-4 text-green-600 hover:underline flex items-center"
      >
        ← Voltar para lista de disciplinas
      </button>

      {/* Card da disciplina */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cabeçalho verde*/}
        <div className="bg-green-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">{disciplina.nome}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
              Código: {disciplina.id}
            </span>
            {disciplina.ch && (
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
                {disciplina.ch}h
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Ementa */}
          <div>
            <Titulo_Escuro>Ementa</Titulo_Escuro>
            <Texto_Escuro>{disciplina.ementa}</Texto_Escuro>
          </div>

          {/* Botão de Download do PDF */}
          {disciplina.link ? (
            <div className="border-t pt-4 mt-4">
              <a
                href={disciplina.link}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {/* Ícone de download */}
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  />
                </svg>
                Baixar PDF da Ementa
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Clique no botão para baixar o arquivo PDF da ementa
              </p>
            </div>
          ) : (
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500 italic">
                Nenhum arquivo PDF disponível para esta disciplina
              </p>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
}