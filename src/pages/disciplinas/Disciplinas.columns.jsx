import { Link } from "react-router-dom";

export const colunasDisciplinas = (onDelete) => [
  { 
    titulo: "ID", 
    campo: "id", 
    tipo: "texto" 
  },
  { 
    titulo: "CÓDIGO", 
    campo: "codigo", 
    tipo: "texto" 
  },
  { 
    titulo: "NOME", 
    campo: "nome", 
    tipo: "texto" 
  },
  { 
    titulo: "CARGA HORÁRIA", 
    campo: "carga_horaria", 
    tipo: "texto" 
  },
  {
    titulo: "AÇÕES",
    campo: "acoes",
    render: (disciplina) => (
      <div className="flex gap-2">
        {/* Botão Visualizar */}
        <Link
          to={`/disciplinas/${disciplina.id}`}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium"
        >
          Visualizar
        </Link>

        {/* Botão Editar */}
        <Link
          to={`/disciplinas/${disciplina.id}/editar`}
          className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-lg text-sm font-medium"
        >
          Editar
        </Link>

        {/* Botão Excluir */}
        <button
          onClick={() => onDelete(disciplina.id)}
          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer"
        >
          Excluir
        </button>
      </div>
    ),
  },
];