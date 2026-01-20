import { LogIn, UserPlus, Menu } from "lucide-react";
import Logo from "../assets/logo.png";

const HeaderPublic = () => {
  return (
    <header className="p-2 bg-gradient-to-r from-orange-400 via-orange-600 to-amber-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-35 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="/cadastrar" className="flex items-center gap-2 text-white/90 hover:text-white transition">
              <UserPlus className="w-4 h-4" />
              Cadastrar Funcionário
            </a>
            <a
              href="/login"
              className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-orange-100 transition shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </a>
          </nav>
          <button className="md:hidden text-white hover:text-orange-100 transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPublic;
