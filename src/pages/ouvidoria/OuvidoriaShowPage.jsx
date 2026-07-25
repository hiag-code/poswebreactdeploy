import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarOuvidoriaPorId } from "./ouvidoria.service";

export default function OuvidoriaShowPage() {
  const { id } = useParams();
  const [ouvidoria, setOuvidoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarOuvidoriaPorId(id);
        setOuvidoria(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setOuvidoria(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!ouvidoria) return <p className="p-6">Aluno não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Detalhes do Aluno</h1>

      <div className="space-y-2">
        <p><strong>Matrícula:</strong> {ouvidoria.id}</p>
        <p><strong>Nome:</strong> {ouvidoria.autor}</p>
        <p><strong>Email:</strong> {ouvidoria.texto}</p>
      </div>
    </div>
  );
}