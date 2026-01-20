import { useState } from "react";
import { User, Mail, Lock, UserCircle, Shield, Eye, EyeOff } from "lucide-react";
import Button from "../components/button";
import Logo from "../assets/logo.png";
import { userService } from "../service/users/userService";

const FormRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
        else if (formData.name.length < 15 || formData.name.length > 100)
            newErrors.name = "Nome deve ter entre 15 e 100 caracteres.";

        if (!formData.username.trim()) newErrors.username = "Username é obrigatório.";
        else if (formData.username.length < 3 || formData.username.length > 15)
            newErrors.username = "Username deve ter entre 3 e 15 caracteres.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "Email é obrigatório.";
        else if (!emailRegex.test(formData.email))
            newErrors.email = "Email deve ser válido.";

        if (!formData.password.trim()) newErrors.password = "Senha é obrigatória.";
        else if (formData.password.length < 8 || formData.password.length > 20)
            newErrors.password = "Senha deve ter entre 8 e 20 caracteres.";

        if (!formData.confirmPassword.trim())
            newErrors.confirmPassword = "Confirmação da senha é obrigatória.";
        else if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "As senhas não coincidem.";

        if (!formData.role) newErrors.role = "Selecione uma função.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setServerError(null);

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...dataToSend } = formData;
            const response = await userService.register(dataToSend);
            console.log("User registered successfully:", response.data);
            window.location.href = "/login?success=Conta criada com sucesso!";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error registering user:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError("Ocorreu um erro inesperado. Tente novamente.");
            }
        }
    };


    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 p-10">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-8 py-10">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center mb-4">
                        <img src={Logo} alt="Logo" className="w-20 drop-shadow-md" />
                        <h1 className="text-2xl font-bold text-orange-700 mt-2">
                            Criar Conta
                        </h1>
                        <p className="text-gray-600 text-sm text-center">
                            Preencha os campos abaixo para se cadastrar
                        </p>
                    </div>

                        {serverError && (
                            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-center mt-3">
                                {serverError}
                            </div>
                        )}

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Nome completo</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <UserCircle className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Digite seu nome completo"
                                className="w-full outline-none"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Username</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <User className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Escolha um username"
                                className="w-full outline-none"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Email</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Mail className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu email"
                                className="w-full outline-none"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Senha</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Lock className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Crie uma senha"
                                className="w-full outline-none"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-orange-600 ml-2"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Confirmar senha</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Lock className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                className="w-full outline-none"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Função</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Shield className="w-5 h-5 text-orange-600 mr-2" />
                            <select
                                name="role"
                                className="w-full outline-none bg-transparent"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma função</option>
                                <option value="USER">Funcionário</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>

                    <Button text="Cadastrar" />
                </form>

                <p className="text-sm text-gray-600 mt-6 text-center">
                    Já possui conta?{" "}
                    <a href="/login" className="text-orange-600 font-medium hover:underline">
                        Entrar
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FormRegister;
