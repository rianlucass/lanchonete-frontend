import { LogOut, ShoppingBag, Package, FileText, Home, Receipt, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";

const HeaderPrivate = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="p-2 bg-gradient-to-r from-orange-400 via-orange-600 to-amber-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-3">
            <Link to={user?.role === "ADMIN" ? "/dashboard" : "/pedidos"}>
              <img src={Logo} alt="Logo" className="h-35 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-white/90">
            {/* APENAS ADMIN VÊ ESSAS OPÇÕES */}
            {user?.role === "ADMIN" && (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link to="/produtos" className="flex items-center gap-2 hover:text-white transition">
                  <Package className="w-4 h-4" />
                  Produtos
                </Link>

                <Link to="/estoque" className="flex items-center gap-2 hover:text-white transition">
                  <Warehouse className="w-4 h-4" />
                  Estoque
                </Link>
              </>
            )}

            {/* ADMIN E FUNCIONÁRIO VEEM PEDIDOS */}
            <Link to="/pedidos" className="flex items-center gap-2 hover:text-white transition">
              <ShoppingBag className="w-4 h-4" />
              Pedidos
            </Link>

            {/* APENAS ADMIN VÊ ESSAS OPÇÕES */}
            {user?.role === "ADMIN" && (
              <>
                <Link to="/relatorio" className="flex items-center gap-2 hover:text-white transition">
                  <Receipt className="w-4 h-4" />
                  Relatório
                </Link>

                <Link to="/historico" className="flex items-center gap-2 hover:text-white transition">
                  <FileText className="w-4 h-4" />
                  Histórico
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-orange-700 px-4 py-2 rounded-md hover:bg-orange-100 transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderPrivate;