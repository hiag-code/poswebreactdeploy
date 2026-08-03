import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { isAdmin } from "../../utils/auth";

import { colunasDocentes } from "./docente.columns";
import { buscarDocentes, excluirDocente } from "./docente.service";

export default function DocentePage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const eadmin = isAdmin()

  useEffect(() => {
    async function carregarDocentes() {
      try {
        setLoading(true);
        const docentes = await buscarDocentes();
        setDados(docentes);

      } catch (error) {
        console.error("Erro ao buscar Docente:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDocentes();
  }, []);

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir este docente?");
    if (!confirmar) return;

    try {
      await excluirDocente(id);
      setDados((prev) => prev.filter((docente) => docente.id !== id));
      alert("Docente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error.response || error);
      const mensagemErro = error.response?.data?.detail || "Erro ao excluir docente.";
      alert(`Erro: ${mensagemErro}`);
    }
  }

  const dadosFiltrados = dados.filter((docente) => {
    const termo = pesquisa.toLowerCase();
    return (
      docente.nome?.toLowerCase().includes(termo) ||
      docente.email?.toLowerCase().includes(termo) ||
      docente.cpf?.includes(termo) ||
      docente.titulacao?.toLowerCase().includes(termo)
    );
  });

  return (
    <ListagemLayout
      titulo="Lista de Docentes"
      subtitulo="Gerencie e visualize todos os docentes cadastrados"
      placeholderPesquisa="Buscar por nome, e-mail, CPF ou titulação..."
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={eadmin ? () => navigate("/docentes/novo") : undefined}
      textoBotao={eadmin ? "Novo edital" : undefined}
    >
      <TituloTabela
        titulo="Docentes"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dadosFiltrados.length}
        inicio={1}
        fim={dadosFiltrados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-4 text-center font-bold text-gray-600">Carregando docentes...</p>
      ) : (
        <Tabela
          dados={dadosFiltrados}
          colunas={colunasDocentes(handleDelete)}
          chaveSelecao="id"
        />
      )}
    </ListagemLayout>
  );
}
