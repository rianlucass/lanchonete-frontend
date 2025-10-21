import { LogIn, UserPlus, Menu, Package } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="p-2 bg-gradient-to-r from-orange-400 via-orange-600 to-amber-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h1 className="text-white text-xl font-bold">Lanchonete</h1>
          </div>

          {/* NAV MENU */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/cadastrar"
              className="flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <UserPlus className="w-4 h-4" />
              Cadastrar Funcionário
            </Link>

            <Link
              to="/produtos"
              className="flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <Package className="w-4 h-4" />
              Produtos
            </Link>

            <Link
              to="/estoque"
              className="flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <Package className="w-4 h-4" />
              Estoque
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-orange-100 transition shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Link>
          </nav>

          {/* BOTÃO MENU MOBILE */}
          <button className="md:hidden text-white hover:text-orange-100 transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
