import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ListagemLayout from "../../layouts/ListagemLayout";
import TituloTabela from "../../components/TituloTabela";
import { buscarEditais, excluirEdital } from "./editais.service";
import { isAdmin } from "../../utils/auth";

export default function EditalPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const eAdmin = isAdmin();

  useEffect(() => {
    carregarEditais();
  }, []);

  async function carregarEditais() {
    try {
      setLoading(true);
      const editais = await buscarEditais();
      setDados(editais);
    } catch (error) {
      console.error("Erro ao buscar editais:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este edital?")) return;

    try {
      await excluirEdital(id);
      setDados((prev) => prev.filter((item) => item.id !== id));
      alert("Edital excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir edital:", error);
      alert("Erro ao excluir edital. Verifique permissões de Admin.");
    }
  }

  const editaisFiltrados = dados.filter((edital) => {
    const termo = pesquisa.toLowerCase();
    return (
      edital.titulo?.toLowerCase().includes(termo) ||
      edital.descricao?.toLowerCase().includes(termo)
    );
  });

  return (
    <ListagemLayout
      titulo="Editais & Processos Seletivos"
      subtitulo="Consulte os editais abertos, retificações e documentos oficiais"
      placeholderPesquisa="Buscar edital..."
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={eAdmin ? () => navigate("/editais/novo") : undefined}
      textoBotao={eAdmin ? " Novo Edital" : undefined}
    >
      <TituloTabela
        titulo="Documentos Publicados"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={editaisFiltrados.length}
        inicio={editaisFiltrados.length > 0 ? 1 : 0}
        fim={editaisFiltrados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-8 text-center font-bold text-gray-600 animate-pulse">
          Carregando editais...
        </p>
      ) : editaisFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm my-4">
          <p className="text-gray-500 font-medium">Nenhum edital encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {editaisFiltrados.map((edital) => (
            <div
              key={edital.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-6"
            >
              <div>
                {/* Header do Card */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Edital #{edital.id}
                  </span>

                  {eAdmin && (
                    <div className="flex gap-1">
                      <Link
                        to={`/editais/${edital.id}/editar`}
                        className="text-amber-600 hover:bg-amber-50 p-1.5 rounded-lg transition text-xs font-bold"
                        title="Editar"
                      >
                      </Link>
                      <button
                        onClick={() => handleDelete(edital.id)}
                        className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition text-xs font-bold cursor-pointer"
                        title="Excluir"
                      >
                      </button>
                    </div>
                  )}
                </div>

                {/* Título e Descrição */}
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2 leading-snug">
                  {edital.titulo}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6">
                  {edital.descricao}
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  to={`/editais/${edital.id}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
                >
                  Ver Detalhes
                </Link>

                {edital.link && (
                  <a
                    href={edital.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 shadow-sm"
                  >
                    <span>Baixar PDF / Link</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ListagemLayout>
  );
}