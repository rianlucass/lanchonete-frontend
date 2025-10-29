import { Routes, Route } from "react-router-dom"
import FormLogin from './pages/formLogin'
import Header from './components/header'
import Footer from './components/footer'
import Cadastrar from './pages/formRegister'
import Dashboard from "./pages/dashboard.tsx"
import Produtos from "./pages/produtos.tsx"

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
           <Route path="/produtos" element={<Produtos />} /> 
        </Routes>
      <Footer />
    </>
  )
}

export default App
