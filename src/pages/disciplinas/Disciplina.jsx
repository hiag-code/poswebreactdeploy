import { useEffect, useState } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

import { colunasDisciplinas } from "./Disciplinas.columns";
import {listar_disciplinas, excluir_disciplina} from "./Disciplinas.service";
import DisciplinaVisualizar from "./disciplinavisualizar";

export default function DisciplinasPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const eadmin = isAdmin();

  // carregar disciplina
  useEffect(() => {
    async function carregarDisciplinas() {
      try {
        setLoading(true);
        const disciplinas = await listar_disciplinas();
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
        await excluir_disciplina(id);
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
      subtitulo="Gerencie e visualize todas as disciplinas"
      placeholderPesquisa="Buscar Disciplinas"
      pesquisa={pesquisa}
      onPesquisa={(e) => setPesquisa(e.target.value)}
      onAdicionar={ eadmin ? () => navigate("/disciplinas/nova") : undefined}
      textoBotao=  {eadmin ? " Nova disciplina": undefined}
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
        <p className="p-4 text-center font-bold text-gray-600">Carregando disciplinas...</p>
      ) : (
        <Tabela
          dados={dados}
          /* Passamos a função handleDelete aqui, igual no Aluno.jsx */
          colunas={colunasDisciplinas(handleDelete)}
          chaveSelecao="id"
        />
      )}
    </ListagemLayout>
  );
}