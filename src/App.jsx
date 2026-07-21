
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import ProcessosSeletivos from "./components/ProcessosSeletivos"
import Noticias from "./components/Noticias"
import Numeros from "./components/Numeros"
import Footer from "./components/Footer"
import TituloTabela from "./components/TituloTabela"
import Alunos from "./pages/alunos/Aluno"
import AlunoCreate from "./pages/alunos/alunoCreate"
import AlunoShow from "./pages/alunos/alunoShow"
import AlunoEdit from "./pages/alunos/alunoEdit"
import ModeloPage from "./pages/modelo/AlunoPage";
import ModeloCreatePage from "./pages/modelo/AlunoCreatePage"
import ModeloShowPage from "./pages/modelo/AlunoShowPage"
import ModeloEditPage from "./pages/modelo/AlunoEditPage"
import Ouvidoria from "./pages/ouvidoria/OuvidoriaPage";
import NoticiaPage from "./pages/noticias/NoticiaPage"
import DocentePage from "./pages/Docente/DocentePage";
import InscricaoPage from "./pages/inscricoes/InscricoesPage";
import DocenteCreatePage from "./pages/Docente/DocenteCreatePage";
import DocenteShowPage from "./pages/Docente/DocenteShowPage";
import DocenteEditPage from "./pages/Docente/DocenteEditPage";
import NoticiaShowPage from "./pages/noticias/NoticiaShowPage"
import NoticiaCreatePage from "./pages/noticias/NoticiaCreatePage"
import NoticiaEditPage from "./pages/noticias/NoticiaEditPage";
import OuvidoriaShowPage from "./pages/ouvidoria/OuvidoriaShowPage";
import OuvidoriaEditPage from "./pages/ouvidoria/OuvidoriaEditePage";
import OuvidoriaCreatePage from "./pages/ouvidoria/OuvidoriaCreatepage";
import EditalPage from "./pages/editais/EditalPage";
import EditalCreatePage from "./pages/editais/EditalCreatePage";
import EditalShowPage from "./pages/editais/EditalShowPage";
import EditalEditPage from "./pages/editais/EditalEditPage";
import InscricoesCreatePage from "./pages/inscricoes/InscricoesCreatePage";
import InscricoesEditPage from "./pages/inscricoes/InscricoesEditPage";
import InscricoesShowPage from "./pages/inscricoes/InscricoesShowPage";
import DisciplinasPage from "./pages/disciplinas/Disciplina";
import DisciplinaVisualizar from "./pages/disciplinas/disciplinavisualizar";
import DisciplinasEditPage from "./pages/disciplinas/DisciplinaEditPage";
import DisciplinaCreatePage from "./pages/disciplinas/DisciplinaCreatePage";
import UsuarioPage from "./pages/usuarios/UsuarioPage";
import UsuarioEditPage from "./pages/usuarios/UsuarioEditPage";
import UsuarioCreatePage from "./pages/usuarios/UsuariosCreatePage";
import UsuarioShowPage from "./pages/usuarios/UsuarioShowPage";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ProcessosSeletivos />
      <Noticias />
      <Numeros />
      <TituloTabela />
    </>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modelo" element={<ModeloPage />} />
        <Route path="/modelo/novo" element={<ModeloCreatePage />} />
        <Route path="/modelo/:matricula" element={<ModeloShowPage />} />
        <Route path="/modelo/:matricula/editar" element={<ModeloEditPage />} />

        <Route path="/ouvidoria" element={<Ouvidoria />} />
        <Route path="/ouvidorias" element={<Ouvidoria />} />
        <Route path="/ouvidorias/novo" element={<OuvidoriaCreatePage />} />
        <Route path="/ouvidorias/:id" element={<OuvidoriaShowPage />} />
        <Route path="/ouvidorias/:id/editar" element={<OuvidoriaEditPage />} />

        <Route path="/aluno" element={<Alunos />} />
        <Route path="/aluno/novo" element={<AlunoCreate />} />
        <Route path="/aluno/:matricula" element={<AlunoShow />} />
        <Route path="/aluno/:matricula/editar" element={<AlunoEdit />} />

        <Route path="/noticias" element={<NoticiaPage />} />
        <Route path="/noticias/novo" element={<NoticiaCreatePage />} />
        <Route path="/noticias/:id" element={<NoticiaShowPage />} />
        <Route path="/noticias/:id/editar" element={<NoticiaEditPage />} />

        <Route path="/docentes" element={<DocentePage />} />
        <Route path="/docentes/novo" element={<DocenteCreatePage />} />
        <Route path="/docentes/:id" element={<DocenteShowPage />} />
        <Route path="/docentes/:id/editar" element={<DocenteEditPage />} />

        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/usuarios/:id" element={<UsuarioShowPage />} />
        <Route path="/usuarios/novo" element={<UsuarioCreatePage />} />
        <Route path="/usuarios/:id/editar" element={<UsuarioEditPage />} />

        <Route path="/inscricoes" element={<InscricaoPage />} />
        <Route path="/inscricoes/novo" element={<InscricoesCreatePage />} />
        <Route path="/inscricoes/:id" element={<InscricoesShowPage />} />
        <Route path="/inscricoes/:id/editar" element={<InscricoesEditPage />} />

        <Route path="/editais" element={<EditalPage />} />
        <Route path="/editais/novo" element={<EditalCreatePage />} />
        <Route path="/editais/:id" element={<EditalShowPage />} />
        <Route path="/editais/:id/editar" element={<EditalEditPage />} />

        <Route path="/disciplinas" element={<DisciplinasPage />} />
        <Route path="/disciplinas/:id" element={<DisciplinaVisualizar />} />
        <Route path="/disciplinas/:id/editar" element={<DisciplinasEditPage />}
        />
        <Route path="/disciplinas/nova" element={<DisciplinaCreatePage />} />
      </Routes>

      <Footer />
    </>
  );
}

