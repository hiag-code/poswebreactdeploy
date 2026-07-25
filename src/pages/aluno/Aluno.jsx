import { useEffect, useState, useMemo } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { useNavigate } from "react-router-dom";

import { buscarAlunos, excluirAluno } from "./alunos.service";
import { colunasAlunos } from "./alunos.columns";
import Subtitulo_branco from "../../components/Subtitulo_branco";

export default function Aluno() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);
  const [visualizarAluno, setVisualizarAluno] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [matriculaExcluir, setMatriculaExcluir] = useState(null);

  const navigate = useNavigate();

  // =============================
  // CARREGAR ALUNOS
  // =============================
  useEffect(() => {
    async function carregarAlunos() {
      try {
        setLoading(true);
        const alunos = await buscarAlunos();
        setDados(alunos);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error.response?.data || error.message);
        alert("Erro ao carregar alunos");
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  // =============================
  // DELETE
  // =============================
  async function handleDelete() {
  try {
    await excluirAluno(matriculaExcluir);

    setDados((prev) =>
      prev.filter((aluno) => aluno.matricula !== matriculaExcluir)
    );

    setModalExcluir(false);
    setMatriculaExcluir(null);

  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Erro ao excluir aluno");
  }
}

  // =============================
  // FILTRO DE PESQUISA (CLIENT SIDE)
  // =============================
  const dadosFiltrados = useMemo(() => {
    if (!pesquisa.trim()) return dados;

    const termo = pesquisa.toLowerCase();

    return dados.filter((aluno) =>
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.email?.toLowerCase().includes(termo) ||
      aluno.matricula?.toString().includes(termo) ||
      aluno.status?.toLowerCase().includes(termo)
    );
  }, [dados, pesquisa]);

  return (
      <ListagemLayout
        titulo="Lista de Alunos"
        subtitulo="Gerencie e visualize todos os alunos matriculados"
        placeholderPesquisa="Buscar aluno..."
        pesquisa={pesquisa}
        onPesquisa={(e) => setPesquisa(e.target.value)}
        onAdicionar={() => navigate("/aluno/novo")}
        textoBotao="Novo Aluno"
      >
      <TituloTabela
        titulo="Alunos Matriculados"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dadosFiltrados.length}
        inicio={dadosFiltrados.length > 0 ? 1 : 0}
        fim={dadosFiltrados.length}
        onPaginaChange={setPaginaAtual}
      />

       {visualizarAluno && dadosSelecionados && (
  <div className="fixed inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative">

      <button
        className="absolute top-4 right-5 text-green-600 text-2xl font-bold hover:scale-110 transition"
        onClick={() => setVisualizarAluno(false)}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-8 text-center text-green-600">
        Visualizar Aluno
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-green-600 font-semibold">Matrícula</p>
          <p className="bg-gray-100 p-3 rounded-xl mt-1">
            {dadosSelecionados.matricula}
          </p>
        </div>

        <div>
          <p className="text-green-600 font-semibold">Nome</p>
          <p className="bg-gray-100 p-3 rounded-xl mt-1">
            {dadosSelecionados.nome}
          </p>
        </div>

        <div>
          <p className="text-green-600 font-semibold">Email</p>
          <p className="bg-gray-100 p-3 rounded-xl mt-1">
            {dadosSelecionados.email}
          </p>
        </div>

        <div>
          <p className="text-green-600 font-semibold">Status</p>
          <p className="bg-gray-100 p-3 rounded-xl mt-1">
            {dadosSelecionados.status}
          </p>
        </div>

        <div>
          <p className="text-green-600 font-semibold">Data Matrícula</p>
          <p className="bg-gray-100 p-3 rounded-xl mt-1">
            {dadosSelecionados.data}
          </p>
        </div>

      </div>
    </div>
  </div>
)}

    {modalExcluir && (
  <div className="fixed inset-0 flex items-center justify-center z-50">

    <div className="bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl p-8 gap-5">

    <div className="mb-8 text-center">
      <Subtitulo_branco>
        Deseja excluir este aluno?
      </Subtitulo_branco>
      </div>

      <div className="flex justify-center gap-6">

        <button
          onClick={() => {
            setModalExcluir(false);
            setMatriculaExcluir(null);
          }}
          className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancelar
        </button>

        <button
          onClick={handleDelete}
          className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Excluir
        </button>

      </div>
    </div>
  </div>
)}

      {loading ? (
        <p className="p-6">Carregando...</p>
      ) : (
        <Tabela
          dados={dadosFiltrados}
          colunas={colunasAlunos}
          chaveSelecao="matricula"
          onAcaoClick={(acao, item) => {
            if (acao === "visualizar") {
              setDadosSelecionados(item);
              setVisualizarAluno(true);
            }

            if (acao === "editar") {
              navigate(`/aluno/${item.matricula}/editar`);
            }

            if (acao === "excluir") {
            setMatriculaExcluir(item.matricula);
            setModalExcluir(true);
          }
          }}
        />
      )}
    </ListagemLayout>
  );
}