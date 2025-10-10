import Logo from "../assets/logo.png"

const Header = () => {
    return(
        <div>
            <header className="bg-red-700 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <img src={Logo} alt="Lanchonete logo" className="h-30 w-30" />
                        </div>
                        <nav className="flex items-center space-x-3">
                            <a
                                href="/cadastrar"
                                className="text-white px-3 py-2 rounded-md transition"
                            >
                                Cadastrar Novo Usuário
                            </a>
                            <a
                                href="/entrar"
                                className="bg-white text-orange-700 px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
                            >
                                Entrar
                            </a>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;