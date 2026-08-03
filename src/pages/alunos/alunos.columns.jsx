import { Link } from "react-router-dom";

export const colunasAlunos = (onDelete) => [
  { titulo: "ID", campo: "id", tipo: "texto" },
  { titulo: "NOME DO ALUNO", campo: "nome", tipo: "texto" },
  { titulo: "EMAIL", campo: "email", tipo: "texto" },
  { titulo: "CPF", campo: "cpf", tipo: "texto" },
  { titulo: "NASCIMENTO", campo: "data_nascimento", tipo: "texto" },
  { titulo: "STATUS", campo: "status", tipo: "texto"},
  {
    titulo: "AÇÕES",
    campo: "acoes",
    render: (aluno) => (
      <div className="flex gap-2">
        {/* Botão Visualizar */}
        <Link
          to={`/aluno/${aluno.id}`}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Visualizar
        </Link>

        {/* Botão Editar */}
        <Link
          to={`/aluno/${aluno.id}/editar`}
          className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Editar
        </Link>

        {/* Botão Excluir */}
        <button
          onClick={() => onDelete(aluno.id)}
          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition"
        >
          Excluir
        </button>
      </div>
    ),
  },
];