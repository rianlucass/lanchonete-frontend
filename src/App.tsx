import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import FormLogin from './pages/formLogin';
import Cadastrar from './pages/formRegister';
import Dashboard from "./pages/dashboard";
import Produtos from "./pages/produtos";
import Pedidos from './pages/Pedidos';
import HistoricoPedidos from './pages/HistoricoPedidos';
import Relatorio from './pages/relatorio';
import HeaderPublic from './components/HeaderPublic';
import HeaderPrivate from './components/HeaderPrivate';
import Footer from './components/Footer';
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // Aguarda verificação de autenticação antes de renderizar rotas
  if (loading) {
    return null; // ou <LoadingScreen /> se preferir
  }

  return (
    <>
      {isAuthenticated ? <HeaderPrivate /> : <HeaderPublic />}

      <Routes>
        {/* ROTA RAIZ - Redireciona baseado no estado de autenticação */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

        <Route path="/login" element={<PublicRoute><FormLogin /></PublicRoute>} />
        
        <Route path="/cadastrar" element={<PublicRoute><Cadastrar /></PublicRoute>} />

        {/* ROTAS PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/relatorio"
          element={
            <PrivateRoute>
              <Relatorio />
            </PrivateRoute>
          }
        />

        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <HistoricoPedidos />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
