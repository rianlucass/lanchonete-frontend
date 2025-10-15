import { useState } from "react";
import { User, Mail, Lock, UserCircle, Shield } from "lucide-react";
import Button from "../components/button";
import Logo from "../assets/logo.png";

const FormRegister = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
        role: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 p-10">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-8 py-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col items-center mb-4">
                        <img src={Logo} alt="Logo" className="w-20 drop-shadow-md" />
                        <h1 className="text-2xl font-bold text-orange-700 mt-2">
                            Criar Conta
                        </h1>
                        <p className="text-gray-600 text-sm text-center">
                            Preencha os campos abaixo para se cadastrar
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Nome completo</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <UserCircle className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Digite seu nome"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Username</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <User className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Escolha um username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Email</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Mail className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Senha</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Lock className="w-5 h-5 text-orange-600 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Crie uma senha"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 pl-1">Função</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500">
                            <Shield className="w-5 h-5 text-orange-600 mr-2" />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent"
                            >
                                <option value="">Selecione uma função</option>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>
                    <Button text="Cadastrar" />
                </form>

                <p className="text-sm text-gray-600 mt-6 text-center">
                    Já possui conta?{" "}
                    <a href="/entrar" className="text-orange-600 font-medium hover:underline">
                        Entrar
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FormRegister;