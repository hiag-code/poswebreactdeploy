import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarInscricaoPorId, atualizarInscricao } from "./inscricoes.service";

export default function InscricoesEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarInscricaoPorId(id);
        setForm(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setForm(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

 
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await atualizarInscricao(id, form);
      navigate("/inscricoes"); 
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar inscrição");
    }
  }

 
  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Inscrição não encontrada.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Editar Inscrição</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Nome do aluno"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Email do aluno"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Status da inscrição"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
