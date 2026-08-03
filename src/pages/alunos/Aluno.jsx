import { useEffect, useState } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { colunasAlunos } from "./alunos.columns";
import { listar_alunos, excluirAluno } from "./alunos.service";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function Aluno() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const eadmin = isAdmin();

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    console.log("1. Chamando API de alunos...");
    try {
      setLoading(true);
      const alunos = await listar_alunos();
      console.log("2. Resposta do backend:", alunos);
      setDados(alunos);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
  if (!window.confirm("Deseja realmente excluir este aluno?")) return;

    try {
      await excluirAluno(id);
      // Remove da tela sem precisar recarregar
      setDados((lista) => lista.filter((aluno) => aluno.id !== id));
      alert("Aluno excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error.response || error);
      
      // Exibe a mensagem real retornada pelo FastAPI
      const mensagemErro = error.response?.data?.detail || "Erro ao excluir aluno.";
      alert(`Erro: ${mensagemErro}`);
    }
  }

  const dadosFiltrados = dados.filter((aluno) => {
    const termo = pesquisa.toLowerCase();
    return (
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.email?.toLowerCase().includes(termo) ||
      aluno.cpf?.includes(termo)
    );
  });


  return (
    <ListagemLayout
      titulo="Lista de Alunos"
      subtitulo="Gerencie e visualize todos os alunos"
      placeholderPesquisa="Buscar Alunos"
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={eadmin ? () => navigate("/aluno/novo") : undefined}
      textoBotao={eadmin ? "Novo Aluno" : undefined}
    >
      <TituloTabela
        titulo="Alunos"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dados.length}
        inicio={1}
        fim={dados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-4 text-center font-bold text-gray-600">Carregando alunos...</p>
      ) : (
        <Tabela
          dados={dados}
          colunas={colunasAlunos(handleDelete)}
          chaveSelecao="id"
        />
      )}
    </ListagemLayout>
  );
} 