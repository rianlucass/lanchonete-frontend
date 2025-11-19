import { Routes, Route } from "react-router-dom";

import FormLogin from './pages/formLogin';
import Cadastrar from './pages/formRegister';
import Dashboard from "./pages/dashboard";
import Produtos from "./pages/produtos";

import Pedidos from './pages/Pedidos';
import HistoricoPedidos from './pages/HistoricoPedidos';

import Header from './components/header';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />          
        <Route path="/historico" element={<HistoricoPedidos />} /> 
      </Routes>
      <Footer />
    </>
  );
};

export default App;
