import { Routes, Route } from "react-router-dom"
import FormLogin from './pages/formLogin'
import Header from './components/header'
import Footer from './components/footer'
import Cadastrar from './pages/formRegister'

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/cadastrar" element={<Cadastrar />} />   
        </Routes>
      <Footer />
    </>
  )
}

export default App
