import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "./login.service"

export default function LoginPage() {
  const navigate = useNavigate();


  const [credenciais, setCredenciais] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

 
  function handleChange(e) {
    setCredenciais({ ...credenciais, [e.target.name]: e.target.value });

    if (erro) setErro(""); 
  }

  async function handleSubmit(e) {
    e.preventDefault();
    

    if (!credenciais.email || !credenciais.senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      const dados = await fazerLogin(credenciais.email, credenciais.senha);
    login(dados.token);
    
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      if (credenciais.email === "admin@blog.com" && credenciais.senha === "123456") {
        
  
        localStorage.setItem("token", "seu_token_jwt_aqui");
        
  
        navigate("/noticias"); 
        login("seu_token_jwt_aqui");
      } else {
        throw new Error("Credenciais inválidas");
      }

    } catch (error) {
      setErro("E-mail ou senha incorretos. Verifique seus dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-700 mb-2">Bem-Vindo</h1>
          <p className="text-gray-500">Faça login para acessar sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          

          {erro && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={credenciais.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="••••••••"
              value={credenciais.senha}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full text-white font-bold py-3 px-4 rounded-xl transition-all 
              ${loading 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg cursor-pointer"
              }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          
        </form>
      </div>
    </div>
  );
}