import { LogOut, ShoppingBag, Package, FileText, Home, Receipt } from "lucide-react";
import { Link } from "react-router-dom"; // ← Importe o Link
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";

const HeaderPrivate = () => {
  const { logout } = useAuth();
  

  const handleLogout = () => {
    logout();
    // Não precisa mais do window.location.href
  };

  return (
    <header className="p-2 bg-gradient-to-r from-orange-400 via-orange-600 to-amber-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-3">
            <Link to="/dashboard"> {/* ← Use Link em vez de <a> */}
              <img src={Logo} alt="Logo" className="h-35 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-white/90">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>

            <Link to="/produtos" className="flex items-center gap-2 hover:text-white transition">
              <Package className="w-4 h-4" />
              Produtos
            </Link>

            <Link to="/pedidos" className="flex items-center gap-2 hover:text-white transition">
              <ShoppingBag className="w-4 h-4" />
              Pedidos
            </Link>
            
            <Link to="/relatorio" className="flex items-center gap-2 hover:text-white transition">
              <Receipt className="w-4 h-4" />
              Relatório
            </Link>

            <Link to="/historico" className="flex items-center gap-2 hover:text-white transition">
              <FileText className="w-4 h-4" />
              Histórico
            </Link>

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