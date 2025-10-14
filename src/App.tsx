import { Routes, Route } from "react-router-dom"
import FormLogin from './pages/formLogin'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
