import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarEditalPorId } from "./editais.service";
import { isAdmin } from "../../utils/auth";

export default function EditalShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edital, setEdital] = useState(null);
  const [loading, setLoading] = useState(true);

  const eAdmin = isAdmin();

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscarEditalPorId(id);
        setEdital(data);
      } catch (error) {
        console.error("Erro ao carregar edital:", error);
        setEdital(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-semibold animate-pulse">Carregando edital...</p>
      </div>
    );
  }

  if (!edital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Edital não encontrado</h2>
          <button
            onClick={() => navigate('/editais')}
            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium cursor-pointer"
          >
            Voltar para Editais
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-12 px-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 sm:p-10">
        
        <button
          type="button"
          onClick={() => navigate('/editais')}
          className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer mb-6 inline-block"
        >
          ← Voltar para Editais
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Edital Oficial #{edital.id}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {edital.titulo}
        </h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-base mb-8">
          {edital.descricao}
        </div>

        {edital.link && (
          <div className="mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Documento do Edital</p>
              <p className="text-sm text-gray-700">Acesse o documento oficial completo em PDF ou página externa</p>
            </div>
            <a
              href={edital.link}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Acessar Documento ↗
            </a>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400">Código #{edital.id}</span>
          
          {eAdmin && (
            <Link
              to={`/editais/${edital.id}/editar`}
              className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              Editar Edital
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}