import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarNoticiaPorId, atualizarNoticia } from "./noticias.service";

export default function NoticiaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarNoticiaPorId(id);
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
      await atualizarNoticia(id, form);
      navigate("/noticias");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar notícia");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Notícia não encontrada.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Editar Notícia</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="border p-2 rounded max-w-4xl"
        />

        <textarea
          name="texto"
          value={form.texto}
          onChange={handleChange}
          className="border p-2 rounded h-64 resize-none"
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