import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticias } from "./noticias.service";
import Titulo_Escuro from "../../components/TituloEscuro";

export default function BlogHomePage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca todas as notícias ao carregar a página
  useEffect(() => {
    async function carregarNoticias() {
      try {
        setLoading(true);
        const dados = await getNoticias(); // Função do seu noticias.service.js
        setNoticias(dados);
      } catch (error) {
        console.error("Erro ao buscar noticias:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarNoticias();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">Carregando o feed de notícias...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <Titulo_Escuro>Últimas Publicações</Titulo_Escuro>
          
        
        {noticias.length === 0 ? (
          <p className="text-gray-500 text-lg">Nenhuma notícia publicada ainda.</p>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            
            {noticias.map((noticia) => (
              <article 
                key={noticia.id} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col flex-grow">
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {noticia.titulo}
                  </h2>
                  
                 
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {noticia.texto}
                  </p>
                  
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      to={`/noticia/${noticia.id}`} 
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                    >
                      Ler notícia completa
                    </Link>
                  </div>

                </div>
              </article>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
}