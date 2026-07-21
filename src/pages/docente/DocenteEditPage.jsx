import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarDocentePorCodigo, atualizarDocente } from "./docente.service";
import { STATUS, STATUS_LIST } from "../../components/Status";

export default function DocenteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

const [form, setForm] = useState({
  id: "",
  nome: "",
  email: "",
  status: STATUS.ATIVO,
  disciplina: ""
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarDocentePorCodigo(id);
        setForm({
          id: data.id || "",
          nome: data.nome || "",
          email: data.email || "",
          status: data.status || STATUS.ATIVO,
          disciplina: data.disciplina || ""
        });

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
      await atualizarDocente(Number(id), form);
      navigate("/docentes");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar docente");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Docente não encontrado.</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md">
      <h1 className="text-xl font-bold mb-6">Editar Docente</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

        <input
          name="id"
          value={form.id}
          readOnly
          className="border p-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
        />

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="disciplina"
          value={form.disciplina}
          onChange={handleChange}
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

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded"
        >
          Atualizar
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