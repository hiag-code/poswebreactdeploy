import { useEffect, useState, useMemo } from "react";
import ListagemLayout from "../../layouts/ListagemLayout";
import Tabela from "../../components/Tabela";
import TituloTabela from "../../components/TituloTabela";
import { useNavigate } from "react-router-dom";

import { buscarUsuarios, excluirUsuario } from "./usuarios.service";
import { colunasUsuarios } from "./usuarios.columns";

export default function UsuarioPage() {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =============================
  // CARREGAR USUARIOS
  // =============================
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        setLoading(true);
        const usuarios = await buscarUsuarios();
        setDados(usuarios);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error.response?.data || error.message);
        alert("Erro ao carregar usuarios");
      } finally {
        setLoading(false);
      }
    }

    carregarUsuarios();
  }, []);

  // =============================
  // DELETE
  // =============================
  async function handleDelete(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuario?");
    if (!confirmar) return;

    try {
      await excluirUsuario(login);

      // Atualização otimista (remove da lista sem recarregar página)
      setDados((prev) =>
        prev.filter((usuario) => usuario.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir:", error.response?.data || error.message);
      alert("Erro ao excluir usuario");
    }
  }

  // =============================
  // FILTRO DE PESQUISA (CLIENT SIDE)
  // =============================
  const dadosFiltrados = useMemo(() => {
    if (!pesquisa.trim()) return dados;

    const termo = pesquisa.toLowerCase();

    return dados.filter((usuario) =>
      usuario.nome?.toLowerCase().includes(termo) ||
      usuario.email?.toLowerCase().includes(termo) ||
      usuario.id?.toString().includes(termo)
    );
  }, [dados, pesquisa]);

  return (
      <ListagemLayout
        titulo="Lista de Usuários"
        subtitulo="Gerencie e visualize todos os usuários"
        placeholderPesquisa="Buscar usuário..."
        pesquisa={pesquisa}
        onPesquisa={(e) => setPesquisa(e.target.value)}
        onAdicionar={() => navigate("/usuarios/novo")}
        textoBotao="Novo Usuário"
      >
      <TituloTabela
        titulo="Usuários Cadastrados"
        paginaAtual={paginaAtual}
        totalPaginas={1}
        totalRegistros={dadosFiltrados.length}
        inicio={dadosFiltrados.length > 0 ? 1 : 0}
        fim={dadosFiltrados.length}
        onPaginaChange={setPaginaAtual}
      />

      {loading ? (
        <p className="p-6">Carregando...</p>
      ) : (
        <Tabela
          dados={dadosFiltrados}
          colunas={colunasUsuarios}
          chaveSelecao="id"
          onAcaoClick={(acao, item) => {
            if (acao === "visualizar") {
              navigate(`/usuarios/${item.id}`);
            }

            if (acao === "editar") {
              navigate(`/usuarios/${item.id}/editar`);
            }

            if (acao === "excluir") {
              handleDelete(item.id);
            }
          }}
        />
      )}
    </ListagemLayout>
  );
}