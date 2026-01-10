import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavMenu } from './components/index.ts'
import Properties from './pages/properties/properties.jsx'
import Products from './pages/products/products.jsx'
import './App.css'
import './components/Nav/navmenu.css'
import { Footer } from './components/Footer/Footer.jsx'

function App() {
  return (
    <Router>
      <div className="contenedor-app">
        <NavMenu />        
        
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>}  />
          <Route path="/properties" element={<Properties />} />
          <Route path="/products" element={<Products />} />
          <Route path="/servicios" element={<h1>Servicios</h1>} />
          <Route path="/contacto" element={<h1>Contacto</h1>} />
        </Routes>

        <Footer />
      </div>
    </Router>

    
  )
}

export default App