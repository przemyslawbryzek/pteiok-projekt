import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
