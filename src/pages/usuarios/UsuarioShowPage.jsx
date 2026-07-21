import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Texto_Escuro from "../../components/TextoEscuro";
import { buscarUsuarioPorLogin } from "./usuarios.service";

export default function UsuarioShowPage() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarUsuarioPorLogin(id);
        setUsuario(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!usuario) return <p className="p-6">Usuario não encontrado.</p>;

  return (
    
     <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 pb-10">
       <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
       <h1 className="text-2xl font-bold mb-8 text-center text-green-600">Detalhes do Usuário</h1>
 

      <div className="space-y-2">
        <p><Texto_Escuro>Login:</Texto_Escuro> <div className="w-full border-2 border-green-500
         p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"> 
         {usuario.login}</div></p>
         <p><Texto_Escuro>ID</Texto_Escuro> <div className="w-full border-2 border-green-500
         p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"> 
         {usuario.id}</div></p>
         <p><Texto_Escuro>Perfil:</Texto_Escuro> <div className="w-full border-2 border-green-500
         p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"> 
         {usuario.perfil}</div></p>
         
      </div>

    </div>
    </div>
    
  );
  
}