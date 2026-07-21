import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarDocente } from "./docente.service";
import { Status } from "../../components/Status";

export default function DocenteCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    nome: "",
    email: "",
    status: "Status",
    disciplina: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await criarDocente(form);
      navigate("/docentes");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao criar docente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md">
      <h1 className="text-xl font-bold mb-6">Novo Docente</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="id"
          placeholder="Código"
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

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          {STATUS_LIST.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
        name="disciplina"
        placeholder="Disciplina"
        value={form.disciplina}
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