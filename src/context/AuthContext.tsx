import { createContext, useEffect, useState, type ReactNode, useContext } from "react";

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }

    setTimeout(() => setLoading(false), 300);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true); // <--- AGORA ATUALIZA A HEADER NA HORA!
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

