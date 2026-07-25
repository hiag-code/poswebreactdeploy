import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarInscricao } from "./inscricoes.service";

export default function InscricaoCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    nome: "",
    email: "",
    status: "",
    data: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarInscricao(form);
      navigate("/inscricoes");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao criar inscrição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Nova Inscrição</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="id"
            placeholder="Código da Inscrição"
            value={form.id}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            name="status"
            placeholder="Status (Ativo, Pendente, Inativo)"
            value={form.status}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            name="data"
            placeholder="Data (dd/mm/yyyy)"
            value={form.data}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}
