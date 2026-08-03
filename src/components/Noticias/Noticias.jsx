import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardNoticias from "./CardNoticias";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/noticias");
        
        // Pega as 3 notícias mais recentes
        setNoticias(response.data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar notícias da Home:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarNoticias();
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-10">
        <div>
          <span className="text-green-700 font-semibold text-sm tracking-wide">
            NOTÍCIAS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
            Últimas Atualizações
          </h2>
        </div>

        {/* Botão funcional navegando para a listagem completa */}
        <Link
          to="/noticias"
          className="flex items-center gap-2 text-green-700 font-semibold hover:underline"
        >
          Ver Todas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 font-medium py-8 animate-pulse">
          Carregando notícias...
        </p>
      ) : noticias.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 text-center py-8">
          <p className="text-gray-500">Nenhuma notícia encontrada.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3">
          {noticias.map((item) => (
            <CardNoticias
              key={item.id}
              noticia={{
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao,
                // Mapeia a imagem enviada pelo backend ou usa uma capa padrão
                imagem: item.imagem_url || "https://placehold.co/600x400?text=Sem+Imagem",
                alt: item.titulo,
                data: "Recente",
                categoria: "Geral",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}