import { useState } from 'react'
import { Card, NavMenu } from './components/index.ts'
import './App.css'
import './components/Nav/navmenu.css'



import img1 from './img/IMG-20240107-WA0047.jpg';
import img2 from './img/IMG-20240107-WA0060.jpg';
import img3 from './img/IMG-20240107-WA0063.jpg';
import img4 from './img/IMG-20240107-WA0063.jpg';
import img5 from './img/IMG-20240107-WA0063.jpg';




export const cabanas = [
  {
    imagen_src: img1,
    descripcion: "Cabaña rústica con vista al lago",
    valor: 120,
    features: { habitaciones: { principal:1, secundaria:2 }, estacionamientos: 1, dormitorios: 1 }
  },
  {
    imagen_src: img2,
    descripcion: "Cabaña moderna cerca del bosque",
    valor: 150,
    features: { habitaciones: { principal:1, secundaria:2 }, estacionamientos: 2, dormitorios: 2 }
  },
  {
    imagen_src: img3,
    descripcion: "Cabaña familiar con parrilla",
    valor: 180,
    features: { habitaciones: { principal:1, secundaria:2 }, estacionamientos: 2, dormitorios: 3 }
  },
  {
    imagen_src: img4,
    descripcion: "Cabaña familiar con parrilla",
    valor: 180,
    features: { habitaciones: { principal:1, secundaria:2 }, estacionamientos: 2, dormitorios: 3 }
  },
  {
    imagen_src: img5,
    descripcion: "Cabaña familiar con parrilla",
    valor: 180,
    features: { habitaciones: { principal:1, secundaria:2 }, estacionamientos: 2, dormitorios: 3 }
  },
  
];

function App() {
  
  return (
    <>
      
      <div className="contenedor-app">
          
          <NavMenu />
        
          <div className="grid">          
              {cabanas.map((cab, i) => (
                <Card
                  key={i}
                  src={cab.imagen_src}
                  descripcion={cab.descripcion}
                  valor={cab.valor}
                  habitaciones={cab.features.habitaciones.principal + cab.features.habitaciones.secundaria || cab.features.habitaciones}
                  habitacion_principal={cab.features.habitaciones.principal}
                  habitacion_secundaria={cab.features.habitaciones.secundaria}
                  estacionamientos={cab.features.estacionamientos}
                  dormitorios={cab.features.dormitorios}
                >
                  <div>Habitaciones: {cab.features.habitaciones.principal + cab.features.habitaciones.secundaria || cab.features.habitaciones}</div>

                  

                  <div>Estacionamientos: {cab.features.estacionamientos}</div>
                  <div>Dormitorios: {cab.features.dormitorios}</div>
                </Card>
              ))}
            </div>
          <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      </div>
    </>
  )
}

export default App
