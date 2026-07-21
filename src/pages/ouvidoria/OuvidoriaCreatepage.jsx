import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarOuvidoria } from "./ouvidoria.service";

export default function OuvidoriaCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    autor: "",
    texto: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarOuvidoria(form);
      navigate("/ouvidorias");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao criar ouvidoria");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Nova Ouvidoria</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="id"
          placeholder="id"
          value={form.id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          name="autor"
          placeholder="autor"
          value={form.autor}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          name="texto"
          placeholder="texto"
          value={form.texto}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}