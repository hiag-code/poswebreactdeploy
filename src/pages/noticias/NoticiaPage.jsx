import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ListagemLayout from "../../layouts/ListagemLayout";
import TituloTabela from "../../components/TituloTabela";
import { getNoticias, excluirNoticia } from "./noticias.service";
import { isAdmin } from "../../utils/auth";

export default function NoticiaPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const eAdmin = isAdmin();

  useEffect(() => {
    carregarNoticias();
  }, []);

  async function carregarNoticias() {
    try {
      setLoading(true);
      const noticias = await getNoticias();
      setDados(noticias);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir esta notícia?")) return;

    try {
      await excluirNoticia(id);
      setDados((prev) => prev.filter((item) => item.id !== id));
      alert("Notícia excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir notícia:", error);
      alert("Erro ao excluir notícia. Verifique as permissões de Admin.");
    }
  }

  const noticiasFiltradas = dados.filter((noticia) => {
    const termo = pesquisa.toLowerCase();
    return (
      noticia.titulo?.toLowerCase().includes(termo) ||
      noticia.descricao?.toLowerCase().includes(termo)
    );
  });

  return (
    <ListagemLayout
      titulo="Notícias & Editais"
      subtitulo="Acompanhe as últimas atualizações, editais e avisos"
      placeholderPesquisa="Buscar notícia ou edital..."
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={eAdmin ? () => navigate("/noticias/novo") : undefined}
      textoBotao={eAdmin ? " Nova Notícia" : undefined}
    >
      <TituloTabela
        titulo="Informativos"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={noticiasFiltradas.length}
        inicio={1}
        fim={noticiasFiltradas.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-8 text-center font-bold text-gray-600 animate-pulse">
          Carregando notícias...
        </p>
      ) : noticiasFiltradas.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm my-4">
          <p className="text-gray-500 font-medium">Nenhuma notícia encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {noticiasFiltradas.map((noticia) => (
            <div
              key={noticia.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {noticia.imagem_url ? (
                <img
                  src={noticia.imagem_url}
                  alt={noticia.titulo}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg p-4 text-center">
                  {noticia.titulo}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {noticia.descricao}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Link
                      to={`/noticias/${noticia.id}`}
                      className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                    >
                      Ler mais
                    </Link>

                    {noticia.link && (
                      <a
                        href={noticia.link}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                      >
                        Abrir Link ↗
                      </a>
                    )}
                  </div>

                  {eAdmin && (
                    <div className="flex gap-1">
                      <Link
                        to={`/noticias/${noticia.id}/editar`}
                        className="text-amber-600 hover:bg-amber-50 p-2 rounded-lg transition text-xs font-bold"
                        title="Editar"
                      >
                      </Link>
                      <button
                        onClick={() => handleDelete(noticia.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition text-xs font-bold cursor-pointer"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ListagemLayout>
  );
}