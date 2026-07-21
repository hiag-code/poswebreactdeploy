import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarOuvidoriaPorId, atualizarOuvidoria } from "./ouvidoria.service";

export default function OuvidoriaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarOuvidoriaPorId(id);
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
      await atualizarOuvidoria(id, form);
      navigate("/ouvidorias");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar ouvidoria");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">ouvidoria não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Editar ouvidoria</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="autor"
          value={form.autor}
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