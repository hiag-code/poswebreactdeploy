import { useEffect, useState } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { useNavigate } from "react-router-dom";

import { colunasDisciplinas } from "./Disciplinas.columns";
import { buscarDisciplinas , buscarDisciplinaPorId, excluirDisciplina} from "./Disciplinas.service";
import DisciplinaVisualizar from "./disciplinavisualizar";

export default function DisciplinasPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // carregar disciplina
  useEffect(() => {
    async function carregarDisciplinas() {
      try {
        setLoading(true);
        const disciplinas = await buscarDisciplinas();
        setDados(disciplinas);

      } catch (error) {
        console.error("Erro ao buscar disciplina:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDisciplinas();
  }, []);

  //deletar disciplina
  async function handleDelete(id) {
      const confirmar = window.confirm("Tem certeza que deseja excluir esta disciplina?");
      if (!confirmar) return;
  
      try {
        await excluirDisciplina(id);
  
        // Atualização otimista (remove da lista sem recarregar página)
        setDados((prev) =>
          prev.filter((disciplina) => disciplina.id !== id)
        );
      } catch (error) {
        console.error("Erro ao excluir:", error.response?.data || error.message);
        alert("Erro ao excluir disciplina");
      }
    }

  return (
    <ListagemLayout
      titulo="Lista de disciplinas"
      subtitulo="Gerencie e visualize todos as disciplinas"
      placeholderPesquisa="Buscar Disciplinas"
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={() => navigate("/disciplinas/nova")}
      textoBotao=" Nova disciplina"
    >
      <TituloTabela
        titulo="Disciplinas"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dados.length}
        inicio={1}
        fim={dados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Tabela
          dados={dados}
          colunas={colunasDisciplinas}
          chaveSelecao="id"
          onAcaoClick={(acao, item) => {
            if (acao === "visualizar") {
              navigate(`/disciplinas/${item.id}`);
            }
             if (acao === "editar") {
              navigate(`/disciplinas/${item.id}/editar`);
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
