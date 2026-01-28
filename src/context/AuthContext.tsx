import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from "react";

type Role = "ADMIN" | "FUNCIONARIO";

interface User {
  role: Role;
}

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as Role | null;

    if (token && role) {
      setIsAuthenticated(true);
      setUser({ role });
    }

    setTimeout(() => setLoading(false), 300);
  }, []);

  const login = (token: string, role: Role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setUser({ role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
