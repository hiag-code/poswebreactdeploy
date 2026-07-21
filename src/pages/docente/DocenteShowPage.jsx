import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDocentePorCodigo } from "./docente.service";
import Status from "../../components/Status";

export default function DocenteShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
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

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg 
            border border-gray-200 shadow-sm">

        <h1 className="text-xl font-bold mb-6 text-center">
          Detalhes do Docente
        </h1>

        <div className="flex flex-col gap-4">

          <InfoItem label="Código" value={docente.id} />
          <InfoItem label="Nome" value={docente.nome} />
          <InfoItem label="Email" value={docente.email} />
          <InfoItem label="Disciplina" value={docente.disciplina} />

          <div>
            <span className="text-sm text-gray-500">Status</span>
            <div className="mt-1">
              <Status status={docente.status} />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Voltar
            </button>

            <button
              onClick={() => navigate(`/docentes/${docente.id}/editar`)}
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Editar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-sm text-gray-500">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  );
}