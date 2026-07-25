<<<<<<< HEAD
=======

>>>>>>> 742cd94745794052baf896e1903976c05d7220f6
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
import Aluno from "./pages/aluno/Aluno"
import AlunoPage from "./pages/aluno/AlunoPage"
import AlunoCreatePage from "./pages/aluno/AlunoCreatePage"
import AlunoShowPage from "./pages/aluno/AlunoShowPage"
import AlunoEditPage from "./pages/aluno/AlunoEditPage"
import NoticiaPage from "./pages/noticias/NoticiaPage"
import DocentePage from "./pages/docente/DocentePage"
import EditalPage from "./pages/editais/EditalPage"
import NoticiasBlog from "./pages/noticias/NoticiasBlog"
import NoticiaShowPage from "./pages/noticias/NoticiaShowPage"
import NoticiaEditPage from "./pages/noticias/NoticiaEditPage"
import NoticiaCreatePage from "./pages/noticias/NoticiaCreatePage"
import LoginPage from "./pages/login/LoginPage"
import { AuthProvider } from './pages/login/AuthContext'
import ProtectedRoute from "./pages/login/ProtectedRoute"


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
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/aluno/novo" element={<AlunoCreatePage />} />
        <Route path="/aluno/show" element={<AlunoShowPage />} />
        <Route path="/aluno/edit" element={<AlunoEditPage />} />
        <Route path="/noticias" element={<NoticiaPage />} />
        <Route path="/docentes" element={<DocentePage />} />
        <Route path="/editais" element={<EditalPage />} />
        <Route path="/noticiasleitura" element={<NoticiasBlog />} />
        <Route path="/noticia/:id" element={<NoticiaShowPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/noticias" element={<NoticiaPage />} />
          <Route path="/noticias/nova" element={<NoticiaCreatePage />} />
          <Route path="/noticias/edit" element={<NoticiaEditPage />} />
          </Route>

      </Routes>

      <Footer />
    </>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 742cd94745794052baf896e1903976c05d7220f6
