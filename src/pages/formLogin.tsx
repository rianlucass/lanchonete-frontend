import { User, Lock } from "lucide-react";
import Button from "../components/button";

const FormLogin = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50">
      <div className="w-96 bg-white/90 backdrop-blur-md shadow-lg px-8 py-10 rounded-2xl border border-gray-200">
        <form className="flex flex-col gap-5">
          <div className="flex justify-center mb-3">
          </div>

          <h1 className="text-center font-extrabold text-3xl text-orange-600">
            Entrar
          </h1>
          <p className="text-gray-500 text-center text-sm mb-3">
            Acesse sua conta e acompanhe as novidades do sistema
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Usuário</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <User className="w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-transparent outline-none text-gray-700"
                type="text"
                placeholder="Digite seu username"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Senha</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-transparent outline-none text-gray-700"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
              href="#"
            >
              Esqueci a senha
            </a>
          </div>

          <Button text="Entrar" />

          <p className="text-xs text-center text-gray-400 mt-3">
            Fique de olho no e-mail para receber atualizações.
          </p>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
