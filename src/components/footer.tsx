import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 via-orange-400 to-amber-700 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
         <img 
             src={Logo} 
            alt="Logo" 
            style={{
            width: "80px",  
            height: "80px", 
            borderRadius: "50%", 
          }} 
        />

        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(98) 3473-3438</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>contato@sabor&arte.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Coelho Neto - MA</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-6 pt-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Sabor & Arte Lanchonete — Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
