import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarInscricaoPorId } from "./inscricoes.service";

export default function InscricoesShowPage() {
  const { id } = useParams();
  const [inscricao, setInscricao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarInscricaoPorId(id);
        setInscricao(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setInscricao(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!inscricao) return <p className="p-6">Inscrição não encontrada.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Detalhes da Inscrição</h1>

      <div className="space-y-2">
        <p><strong>ID:</strong> {inscricao.id}</p>
        <p><strong>Nome:</strong> {inscricao.nome}</p>
        <p><strong>Email:</strong> {inscricao.email}</p>
        <p><strong>Status:</strong> {inscricao.status}</p>
      </div>
    </div>
  );
}
