import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { realizarLogin } from "./login.service"; // Confirme o caminho do arquivo

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      // Passa o e-mail/usuário e a senha
      await realizarLogin(email, senha);
      navigate("/")
      
    } catch (error) {
      console.error("ERRO NO LOGIN:", error.response || error);
      const detalhe = error.response?.data?.detail;
      const mensagem = typeof detalhe === "string" ? detalhe : "Credenciais inválidas ou erro no servidor.";
      
      alert(`Falha no login: ${mensagem}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 space-y-6">

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              E-mail ou Usuário
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-slate-800 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-slate-800 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {carregando ? "Autenticando..." : "Entrar no Sistema"}
          </button>
        </form>

      </div>
    </div>
  );
}