import { Routes, Route } from "react-router-dom"
import FormLogin from './pages/formLogin'
import Header from './components/header'
import Footer from './components/footer'
import Cadastrar from './pages/formRegister'
import Dashboard from "./pages/dashboard.tsx"

function App() {
  return (
    <>
      <Header />
        <Routes>
           <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/cadastrar" element={<Cadastrar />} />   
        </Routes>
      <Footer />
    </>
  )
}

export default App
