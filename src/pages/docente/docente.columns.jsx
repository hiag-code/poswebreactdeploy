import { Link } from "react-router-dom";

export const colunasDocentes = (onDelete) => [
  { titulo: "CÓDIGO", campo: "id", tipo: "texto" },
  { titulo: "NOME DO DOCENTE", campo: "nome", tipo: "texto" },
  { titulo: "EMAIL", campo: "email", tipo: "texto" },
  { titulo: "CPF", campo: "cpf", tipo: "texto" },
  { titulo: "TITULAÇÃO", campo: "titulacao", tipo: "texto" },
  { titulo: "STATUS", campo: "status", tipo: "texto" },
  {
    titulo: "AÇÕES",
    campo: "acoes",
    render: (docente) => (
      <div className="flex gap-2">
        {/* Botão Visualizar */}
        <Link
          to={`/docentes/${docente.id}`}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Visualizar
        </Link>

        {/* Botão Editar */}
        <Link
          to={`/docentes/${docente.id}/editar`}
          className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Editar
        </Link>

        {/* Botão Excluir */}
        <button
          onClick={() => onDelete(docente.id)}
          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition"
        >
          Excluir
        </button>
      </div>
    ),
  },
];