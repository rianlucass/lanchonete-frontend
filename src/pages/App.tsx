import { Routes, Route } from "react-router-dom"
import FormLogin from "./formLogin"
import Header from "../components/header"
import Footer from "../components/footer"
import Cadastrar from "./formRegister"
import Lanchonete from './Lanchonete'
import Produtos from './Produtos'
import Estoque from './Estoque'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/lanchonete" element={<Lanchonete />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/estoque" element={<Estoque />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
