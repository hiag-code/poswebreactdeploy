import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarUsuarioPorLogin, atualizarUsuario } from "./usuarios.service";
import Texto_Escuro from "../../components/TextoEscuro";

export default function UsuarioEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarUsuarioPorLogin(id);
        setForm(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await atualizarUsuario(id, form);
      navigate("/usuarios");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao atualizar usuario");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!form) return <p className="p-6">Usuário não encontrado.</p>;

 return (
     <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
       <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
       <h1 className="text-2xl font-bold mb-8 text-center text-green-600">Novo Usuário</h1>
 
       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
         <Texto_Escuro>Login</Texto_Escuro>
         <input
           name="login"
           placeholder="Login"
           value={form.login}
           onChange={handleChange}
           required
        className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
           />
         </div>
 
         <div>
         <Texto_Escuro>Nome</Texto_Escuro>
         <input
           name="nome"
           placeholder="Nome"
           value={form.nome}
           onChange={handleChange}
           required
        className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
           />
         </div>
 
         <div>
         <Texto_Escuro>E-mail</Texto_Escuro>
         <input
           name="email"
           placeholder="Email"
           value={form.email}
           onChange={handleChange}
           required
           className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
           />
       
         </div>
 
         <div>
         <Texto_Escuro>Perfil</Texto_Escuro>
         <input
           name="perfil"
           placeholder="Perfil"
           value={form.perfil}
           onChange={handleChange}
           required
         className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
           />
         
         </div>
 
         <div>
         <Texto_Escuro>Senha</Texto_Escuro>
         <input
           name="senha"
           placeholder="Senha"
           value={form.senha}
           type="password"
           onChange={handleChange}
           required
         className="w-full border-2 border-green-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
           />
       
         </div>

         <div className="flex gap-6"> 
         <button
        type="submit"
          className="w-full bg-green-600 text-white py-2 rounded "
        >
          Atualizar
         </button>
             <button className="w-full bg-green-600 text-white py-2 rounded"
        onClick={() => navigate('/usuarios')}
        >
          Retornar </button>
        </div>
       </form>
     </div></div>
   );
}