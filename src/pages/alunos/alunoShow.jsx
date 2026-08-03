import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscar_aluno} from "./alunos.service";
import Texto_Escuro from "../../components/TextoEscuro";
import { useNavigate } from "react-router-dom";

export default function AlunoShow() {
  const { id, matricula } = useParams();
  const alunoId = id || matricula;
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscar_aluno(id);
        setAluno(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setAluno(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading){
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-semibold animate-pulse">
          Carregando dados do aluno...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Aluno Não Encontrado</h2>
          <p className="text-sm text-gray-500 mb-6">{erro}</p>
          <button
            onClick={() => navigate('/aluno')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    );
  }

  if (!aluno) return <p className="p-6">Aluno não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10 px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <button
            onClick={() => navigate('/aluno')}
            className="text-green-600 hover:text-green-700 text-sm font-medium transition flex items-center gap-1"
          >
            ← Voltar
          </button>

          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
            {aluno.status || "Ativo"}
          </span>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-600 mb-1">
            {aluno.nome}
          </h1>
          <p className="text-sm text-gray-400 font-mono">
            ID / Matrícula: #{aluno.id}
          </p>
        </div>

        {/* Informações do Aluno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/80 p-6 rounded-2xl mb-8 border border-gray-100">
          <div>
            <Texto_Escuro>E-mail</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1 break-all">
              {aluno.email || "Não informado"}
            </p>
          </div>

          <div>
            <Texto_Escuro>CPF</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1">
              {aluno.cpf || "Não informado"}
            </p>
          </div>

          <div>
            <Texto_Escuro>Data de Nascimento</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1">
              {aluno.data_nascimento || "Não informada"}
            </p>
          </div>

          <div>
            <Texto_Escuro>Status no Sistema</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1 capitalize">
              {aluno.status || "Ativo"}
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <Link
            to={`/aluno/${aluno.id}/editar`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
          >
            Editar Aluno
          </Link>

          <button
            type="button"
            onClick={() => navigate('/aluno')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}