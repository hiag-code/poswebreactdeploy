import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarNoticiaPorId } from "./noticias.service";

export default function NoticiaShowPage() {
  // Captura o ID da URL (ex: /noticia/1)
  const { id } = useParams();
  
  // Estados para gerenciar a notícia e o carregamento
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados da notícia quando o componente é montado ou o ID muda
  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await buscarNoticiaPorId(id);
        setNoticia(data);
      } catch (error) {
        console.error("Erro ao buscar a notícia:", error.response?.data || error.message);
        setNoticia(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  // Telas de feedback para o usuário
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">Carregando notícia...</p>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-xl text-red-600 mb-4">Notícia não encontrada.</p>
        <Link to="/noticias" className="text-blue-600 hover:underline">
          Voltar para a lista de notícias
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Contêiner principal no estilo "card" limpo para leitura */}
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Cabeçalho da Notícia */}
        <div className="p-8 md:p-12 border-b border-gray-100">
          <Link 
            to="/noticias" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            &larr; Voltar
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            {noticia.titulo}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500">
            <span>ID da publicação: {noticia.id}</span>
          </div>
        </div>

        {/* Corpo da Notícia */}
        <div className="p-8 md:p-12">
          {/* A classe whitespace-pre-wrap garante que as quebras de linha do seu textarea sejam respeitadas na exibição */}
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {noticia.texto}
          </div>
        </div>

      </article>
    </div>
  );
}