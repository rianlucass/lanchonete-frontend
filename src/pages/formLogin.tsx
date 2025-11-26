import { User, Lock } from "lucide-react";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userService } from "../service/users/userService";
import { useAuth } from "../context/AuthContext";

const FormLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("success");
    if (message) {
      setSuccessMessage(message);
      window.history.replaceState({}, document.title, "/login");
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await userService.login(credentials);
      const token = response.data.token;

      login(token);

      navigate("/dashboard");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Usuário ou senha incorretos.");
      } else {
        setErrorMessage("Erro ao conectar ao servidor. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50">
      <div className="w-96 bg-white/90 backdrop-blur-md shadow-lg px-8 py-10 rounded-2xl border border-gray-200">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h1 className="text-center font-extrabold text-3xl text-orange-600">
            Entrar
          </h1>
          <p className="text-gray-500 text-center text-sm mb-3">
            Acesse sua conta e acompanhe as novidades do sistema
          </p>

          {successMessage && (
            <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl text-center mb-3">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-center mb-3">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Usuário</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <User className="w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-transparent outline-none text-gray-700"
                type="text"
                name="username"
                placeholder="Digite seu username"
                value={credentials.username}
                onChange={handleChange}
                required
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
                name="password"
                placeholder="Digite sua senha"
                value={credentials.password}
                onChange={handleChange}
                required
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
