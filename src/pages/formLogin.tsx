import { User, Lock } from "lucide-react";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userService } from "../service/users/userService";
import { useAuth } from "../context/AuthContext";

const FormLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const state = location.state as { message?: string };
    if (state?.message) {
      setSuccessMessage(state.message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await userService.login(credentials);

      const { token, role } = response.data;

      login(token, role);

      if (role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/pedidos");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response?.status === 401) {
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

          {successMessage && (
            <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl text-center">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-700">Usuário</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Senha</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <Button text="Entrar" />
        </form>
      </div>
    </div>
  );
};

export default FormLogin;