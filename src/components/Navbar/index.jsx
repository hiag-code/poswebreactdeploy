import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  // 1. Busca os dados do usuário logado no localStorage
  const usuarioSalvo = localStorage.getItem("usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // 2. Busca o nível de acesso (aceita 'tipo', 'perfil' ou 'role')
  const perfil = (
    usuarioLogado?.tipo || 
    usuarioLogado?.perfil || 
    usuarioLogado?.role || 
    ""
  ).toLowerCase();

  // 3. Mapeamento dos 3 níveis de acesso
  const eEstudante = perfil === "estudante";
  const eDocente = perfil === "docente";
  const eAdmin = perfil === "admin";

  function handleLogout() {
    setMenuAberto(false);
    localStorage.clear();
    navigate("/login");
  }

  // Função auxiliar para fechar o menu ao clicar em qualquer link
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 sm:px-10 py-4 font-medium text-sm">
        
        {/* Logo + título */}
        <Link to="/" onClick={fecharMenu} className="flex items-center space-x-3 sm:space-x-4">
          <Logo variant="dark" size={60} />
          <div>
            <h1 className="text-base sm:text-lg font-semibold leading-tight">Pós-Graduação</h1>
            <p className="text-xs sm:text-sm text-gray-600">Desenvolvimento Web</p>
          </div>
        </Link>

        {/* ÍCONE MENU HAMBÚRGUER (Aparece apenas no Celular) */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden text-gray-700 hover:text-green-700 focus:outline-none p-2 rounded-lg"
          aria-label="Abrir Menu"
        >
          {menuAberto ? (
            /* Ícone de Fechar (X) */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Ícone Hambúrguer (3 barras) */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* MENU DESKTOP (Aparece apenas em telas médias/grandes) */}
        <div className="hidden md:flex flex-row gap-5 items-center">
          <Link to="/" className="hover:text-green-700 transition">Início</Link>

          {(eEstudante || eAdmin) && (
            <Link to="/aluno" className="hover:text-green-700 transition">Alunos</Link>
          )}

          {(eEstudante || eDocente || eAdmin) && (
            <Link to="/disciplinas" className="hover:text-green-700 transition">Disciplinas</Link>
          )}

          <Link to="/docentes" className="hover:text-green-700 transition">Docentes</Link>
          <Link to="/editais" className="hover:text-green-700 transition">Editais</Link>
          <Link to="/noticias" className="hover:text-green-700 transition">Notícias</Link>

          {eAdmin && (
            <Link to="/relatorios" className="hover:text-green-800 font-semibold text-green-700">
              Relatórios
            </Link>
          )}

          {usuarioLogado ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-700 cursor-pointer text-red-600 font-semibold"
            >
              Sair
            </button>
          ) : (
            <Link to="/login" className="hover:text-green-700 transition">Login</Link>
          )}

          {(eEstudante || eAdmin) && (
            <Link
              to="/aluno"
              className="bg-green-600 px-5 py-2 rounded font-semibold hover:bg-green-500 text-white transition"
            >
              Portal do Aluno
            </Link>
          )}
        </div>
      </nav>

      {/* MENU MOBILE (Aparece quando clica no botão Hambúrguer) */}
      {menuAberto && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          <Link to="/" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
            Início
          </Link>

          {(eEstudante || eAdmin) && (
            <Link to="/aluno" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
              Alunos
            </Link>
          )}

          {(eEstudante || eDocente || eAdmin) && (
            <Link to="/disciplinas" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
              Disciplinas
            </Link>
          )}

          <Link to="/docentes" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
            Docentes
          </Link>

          <Link to="/editais" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
            Editais
          </Link>

          <Link to="/noticias" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
            Notícias
          </Link>

          {eAdmin && (
            <Link to="/relatorios" onClick={fecharMenu} className="py-2 font-semibold text-green-700 border-b border-gray-50">
              Relatórios
            </Link>
          )}

          {/* Botão de Login / Sair (Mobile) */}
          {usuarioLogado ? (
            <button
              onClick={handleLogout}
              className="py-2 text-left text-red-600 font-semibold border-b border-gray-50"
            >
              Sair
            </button>
          ) : (
            <Link to="/login" onClick={fecharMenu} className="py-2 hover:text-green-700 border-b border-gray-50">
              Login
            </Link>
          )}

          {/* Botão Destaque Portal do Aluno (Mobile) */}
          {(eEstudante || eAdmin) && (
            <Link
              to="/aluno"
              onClick={fecharMenu}
              className="bg-green-600 px-5 py-3 rounded text-center font-semibold text-white hover:bg-green-500 mt-2"
            >
              Portal do Aluno
            </Link>
          )}
        </div>
      )}
    </header>
  );
}