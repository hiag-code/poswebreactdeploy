import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTexto from "../CardTexto";
import { buscarEditais } from "../../pages/editais/editais.service";

export default function ProcessosSeletivos() {
  const [editais, setEditais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEditais() {
      try {
        setLoading(true);
        const data = await buscarEditais();
        
        // Pega apenas os 3 editais mais recentes
        setEditais(data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar editais da Home:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarEditais();
  }, []);

  return (
    <section className="bg-green-100 flex flex-col items-center justify-center py-8 md:py-14 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 md:mb-10 gap-4 text-center md:text-left">
          <div>
            <h4 className="text-green-800 text-xs sm:text-sm font-bold tracking-wider uppercase">
              EDITAIS E PROCESSOS
            </h4>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mt-1">
              Processos Seletivos Abertos
            </h1>
          </div>

          <Link
            to="/editais"
            className="text-green-800 font-bold hover:underline flex items-center gap-1 transition py-1 px-3 rounded-lg hover:bg-green-200/60"
          >
            Ver Todos os Editais ➔
          </Link>
        </div>

        {/* Estados de Carregamento e Lista */}
        {loading ? (
          <p className="text-green-800 font-semibold py-8 text-center animate-pulse">
            Carregando editais em aberto...
          </p>
        ) : editais.length === 0 ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center max-w-md mx-auto">
            <p className="text-gray-500 font-medium">Nenhum edital publicado no momento.</p>
          </div>
        ) : (
          /* 
            MOBILE: 'flex overflow-x-auto' deixa um do lado do outro com deslize (swipe)
            DESKTOP (md): 'md:grid md:grid-cols-3' volta ao padrão normal de 3 colunas
          */
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth w-full">
            {editais.map((edital) => (
              <div 
                key={edital.id} 
                className="min-w-[85vw] sm:min-w-[340px] md:min-w-full snap-center flex flex-col"
              >
                <CardTexto
                  titulo={edital.titulo}
                  descricao={edital.descricao}
                  status="Aberto"
                  badgeColor="bg-emerald-100 text-emerald-700"
                  iconColor="fill-emerald-600"
                  linkColor="text-green-800"
                  shadowColor="#006D38"
                  deadline={`Edital #${edital.id}`}
                  linkText="Ver Detalhes"
                  link={`/editais/${edital.id}`}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}