import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDocentePorCodigo } from "./docente.service";
import { Link } from "react-router-dom";
import Texto_Escuro from "../../components/TextoEscuro";

export default function DocenteShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {

      if (!id || id === "undefined") {
        setErro("Código do docente não informado.");
        setLoading(false);
        return;
      }

      try {
        const data = await buscarDocentePorCodigo(id);
        setDocente(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setDocente(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!docente) return <p className="p-6">Docente não encontrado.</p>;

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Docente Não Encontrado</h2>
          <p className="text-sm text-gray-500 mb-6">{erro}</p>
          <button
            type="button"
            onClick={() => navigate('/docentes')}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10 px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/docentes')}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition flex items-center gap-1 cursor-pointer"
          >
            ← Voltar
          </button>

          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
            {docente.status || "Ativo"}
          </span>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-600 mb-1">
            {docente.nome}
          </h1>
          <p className="text-sm text-gray-400 font-mono">
            Código / ID: #{docente.id}
          </p>
        </div>

        {/* Informações do Docente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/80 p-6 rounded-2xl mb-8 border border-gray-100">
          <div>
            <Texto_Escuro>E-mail</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1 break-all">
              {docente.email || "Não informado"}
            </p>
          </div>

          <div>
            <Texto_Escuro>CPF</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1">
              {docente.cpf || "Não informado"}
            </p>
          </div>

          <div>
            <Texto_Escuro>Titulação</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1">
              {docente.titulacao || "Não informada"}
            </p>
          </div>

          <div>
            <Texto_Escuro>Status no Sistema</Texto_Escuro>
            <p className="text-gray-800 font-medium mt-1 capitalize">
              {docente.status || "Ativo"}
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <Link
            to={`/docentes/${docente.id}/editar`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
          >
            Editar Docente
          </Link>

          <button
            type="button"
            onClick={() => navigate('/docentes')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}