import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarEditalPorId } from "./editais.service";

export default function EditalShowPage() {
  const { id } = useParams();
  const [edital, setEdital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarEditalPorId(id);
        setEdital(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setEdital(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!edital) return <p className="p-6">Edital não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Detalhes do Edital</h1>

      <div className="space-y-2">
        <p><strong>ID:</strong> {edital.id}</p>
        <p><strong>Título:</strong> {edital.titulo}</p>
        <p><strong>Texto:</strong> {edital.texto}</p>
        <p><strong>Status:</strong> {edital.status}</p>
      </div>
    </div>
  );
}