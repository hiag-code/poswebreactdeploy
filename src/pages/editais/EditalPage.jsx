import { useEffect, useState, useMemo } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { useNavigate } from "react-router-dom";

import { colunasEditais } from "./editais.columns";
import { buscarEditais, excluirEdital } from "./editais.service";

export default function EditalPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function carregarEditais() {
      try {
        setLoading(true);
        const editais = await buscarEditais();
        setDados(editais);
      } catch (error) {
        console.error("Erro ao buscar editais:", error.response?.data || error.message);
        alert("Erro ao carregar editais");
      } finally {
        setLoading(false);
      }
    }

    carregarEditais();
  }, []);

  async function handleDelete(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este edital?");
    if (!confirmar) return;
    try {
      await excluirEdital(id);
      setDados((prev) => prev.filter((edital) => edital.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error.response?.data || error.message);
      alert("Erro ao excluir edital");
    }
  }

    const dadosFiltrados = useMemo(() => {
      if (!pesquisa.trim()) return dados;

      const termo = pesquisa.toLowerCase();
      return dados.filter((edital) =>
        edital.titulo.toLowerCase().includes(termo) ||
        edital.descricao.toLowerCase().includes(termo)
      );
    }, [dados, pesquisa]);

  return (
    <ListagemLayout
      titulo="Lista de Editais"
      subtitulo="Gerencie e visualize todos os editais publicados"
      placeholderPesquisa="Buscar edital..."
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={() => navigate("/editais/novo")}
      textoBotao="Novo Edital"
    >
      <TituloTabela
        titulo="Editais Publicados"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dadosFiltrados.length}
        inicio={dadosFiltrados.length > 0 ? 1 : 0}
        fim={dadosFiltrados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-6">Carregando...</p>
      ) : (
        <Tabela
          dados={dadosFiltrados}
          colunas={colunasEditais}
          chaveSelecao="id"
          onAcaoClick={(acao, item) => {
            if (acao === "visualizar") {
              navigate(`/editais/${item.id}`);
            }

            if (acao === "editar") {
              navigate(`/editais/${item.id}/editar`);
            }

            if (acao === "excluir") {
              handleDelete(item.id);
            }
          }}
        />
      )}
    </ListagemLayout>
  );
}