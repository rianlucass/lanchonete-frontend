import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import FormLogin from "./pages/formLogin";
import Cadastrar from "./pages/formRegister";
import Dashboard from "./pages/dashboard";
import Produtos from "./pages/produtos";
import Pedidos from "./pages/Pedidos";
import HistoricoPedidos from "./pages/HistoricoPedidos";
import Relatorio from "./pages/relatorio";
import HeaderPublic from "./components/HeaderPublic";
import HeaderPrivate from "./components/HeaderPrivate";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? <HeaderPrivate /> : <HeaderPublic />}

      <Routes>
        {/* ROTA RAIZ */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.role === "ADMIN" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/pedidos" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ROTAS PÚBLICAS */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <FormLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/cadastrar"
          element={
            <PublicRoute>
              <Cadastrar />
            </PublicRoute>
          }
        />

        {/* ROTAS ADMIN */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {user?.role === "ADMIN" ? (
                <Dashboard />
              ) : (
                <Navigate to="/pedidos" replace />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              {user?.role === "ADMIN" ? (
                <Produtos />
              ) : (
                <Navigate to="/pedidos" replace />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/relatorio"
          element={
            <PrivateRoute>
              {user?.role === "ADMIN" ? (
                <Relatorio />
              ) : (
                <Navigate to="/pedidos" replace />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/historico"
          element={
            <PrivateRoute>
              {user?.role === "ADMIN" ? (
                <HistoricoPedidos />
              ) : (
                <Navigate to="/pedidos" replace />
              )}
            </PrivateRoute>
          }
        />
     

        {/* ROTAS FUNCIONÁRIO */}
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
