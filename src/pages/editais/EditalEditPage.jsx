import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarEditalPorId, atualizarEdital } from "./editais.service";

export default function EditalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarEditalPorId(id);
        setForm(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
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
      await atualizarEdital(id, form);
      navigate("/editais");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar edital");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Edital não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Editar Edital</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="texto"
          value={form.texto}
          onChange={handleChange}
          className="border p-2 rounded"
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