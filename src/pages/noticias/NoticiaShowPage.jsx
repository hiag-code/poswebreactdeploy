import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarNoticiaPorId } from "./noticias.service";
import { isAdmin } from "../../utils/auth";

export default function NoticiaShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  const eAdmin = isAdmin();

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscarNoticiaPorId(id);
        setNoticia(data);
      } catch (error) {
        console.error("Erro ao buscar notícia:", error);
        setNoticia(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-semibold animate-pulse">Carregando notícia...</p>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Notícia não encontrada</h2>
          <button
            onClick={() => navigate('/noticias')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl font-medium cursor-pointer"
          >
            Voltar para Notícias
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-12 px-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {noticia.imagem_url && (
          <img
            src={noticia.imagem_url}
            alt={noticia.titulo}
            className="w-full h-72 object-cover"
          />
        )}

        <div className="p-8 sm:p-10">
          <button
            type="button"
            onClick={() => navigate('/noticias')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition cursor-pointer mb-6 inline-block"
          >
            ← Voltar para Notícias
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {noticia.titulo}
          </h1>

          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-base mb-8">
            {noticia.descricao}
          </div>

          {noticia.link && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase">Link de Acesso / Edital</p>
                <p className="text-sm text-gray-700">Acesse o documento ou página oficial externa</p>
              </div>
              <a
                href={noticia.link}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Acessar Link ↗
              </a>
            </div>
          )}
          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">Código #{noticia.id}</span>
            {eAdmin &&(
              <Link
                to={`/noticias/${noticia.id}/editar`}
                className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                Editar Publicação
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}