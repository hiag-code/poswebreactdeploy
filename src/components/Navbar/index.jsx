import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center  justify-between px-10 py-5 bg-white shadow text-sm font-medium">
      
      {/* Logo + título */}
      <div className="flex items-center space-x-4">
        <Logo variant="dark" size={80} />

        {/* Texto Pós-Graduação */}
        <div>
          <h1 className="text-lg font-semibold">Pós-Graduação</h1>
          <p className="text-sm">Desenvolvimento Web</p>
        </div>
      </div>

      {/* Menu de links */}
            <div className="flex flex-row gap-5 items-center">

        <Link to="/" className="hover:text-gray-500">
          Início
        </Link>

        <Link to="/noticiasleitura" className="hover:text-gray-500">
          Notícias
        </Link>

        <Link to="/aluno" className="hover:text-gray-500">
          Alunos
        </Link>

        <Link to="/docentes" className="hover:text-gray-500">
          Docentes
        </Link>

        <Link to="/editais" className="hover:text-gray-500">
          Editais
        </Link>


        {/* Botão Login*/}
        <a
          href="./#/login"
          className="bg-green-600 px-5 py-2 rounded font-semibold hover:bg-green-500 text-white"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
