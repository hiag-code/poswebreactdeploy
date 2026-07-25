import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const tokenSalvo = localStorage.getItem('token');
    if (tokenSalvo) {
      setToken(tokenSalvo);
    }
  }, []);


  function login(novoToken) {
    localStorage.setItem('token', novoToken);
    setToken(novoToken);
    navigate('/noticias'); 
  }

 
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }


  return (
    <AuthContext.Provider value={{ token, logado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}