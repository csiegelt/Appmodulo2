import { useState } from 'react'
import { Card, Filter, NavMenu } from './components/index.ts'
import './App.css'
import './components/Nav/navmenu.css'
import propiedadesData from './data/propiedades.json'

import img1 from './assets/img/IMG-20240107-WA0047.jpg';
import img2 from './assets/img/IMG-20240107-WA0060.jpg';
import img3 from './assets/img/IMG-20240107-WA0063.jpg';

const imageMap = {
  img1,
  img2,
  img3,
  img4: img3,
  img5: img3
};

const propiedadesConImagenes = propiedadesData.map(prop => ({
  ...prop,
  imagen_src: imageMap[prop.imagen_src] || img1
}));

function App() {
  const [propiedades, setPropiedadesState] = useState(propiedadesConImagenes);

  const aplicarFiltros = (filtros) => {
    let resultado = [...propiedadesConImagenes];

    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const busqueda = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(prop =>
        prop.descripcion.toLowerCase().includes(busqueda) ||
        prop.ciudad.toLowerCase().includes(busqueda) ||
        prop.direccion.toLowerCase().includes(busqueda) ||
        prop.tipo.toLowerCase().includes(busqueda)
      );
    }

    if (filtros.ciudad && filtros.ciudad !== 'todas') {
      resultado = resultado.filter(prop => prop.ciudad === filtros.ciudad);
    }

    if (filtros.tipo && filtros.tipo !== 'todos') {
      resultado = resultado.filter(prop => prop.tipo === filtros.tipo);
    }

    setPropiedadesState(resultado);
  };
  
  return (
    <>
      <div className="contenedor-app">
        <NavMenu />        
        <div className="app-header">
        <Filter        
        texto="Buscar por descripción, ciudad o dirección..." 
          propiedades={propiedadesConImagenes}
          onFiltrar={aplicarFiltros}    
        />
        </div>
        
        <div className="grid">          
          {propiedades.map((prop) => {
            const totalHabitaciones = prop.features.habitaciones.principal + prop.features.habitaciones.secundaria;
            
            return (
              <Card
                key={prop.id}
                src={prop.imagen_src}
                descripcion={prop.descripcion}
                valor={prop.precio}
                tipo={prop.tipo}
                ciudad={prop.ciudad}
                habitacion_principal={prop.features.habitaciones.principal}
                habitacion_secundaria={prop.features.habitaciones.secundaria}
                tipo_operacion={prop.tipo_operacion}
                habitaciones={totalHabitaciones}
                estacionamientos={prop.features.estacionamientos}
                dormitorios={prop.features.dormitorios}
              >
                <div>Ciudad: {prop.ciudad}</div>
                <div>Tipo: {prop.tipo}</div>
                <div>Operación: {prop.tipo_operacion}</div>
                <div>Habitaciones: {totalHabitaciones}</div>
                <div>Estacionamientos: {prop.features.estacionamientos}</div>
                <div>Dormitorios: {prop.features.dormitorios}</div>
              </Card>
            );
          })}
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
