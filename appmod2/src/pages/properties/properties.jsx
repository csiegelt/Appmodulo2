import { useState } from 'react'
import { Card, Filter } from '../../components/index.ts'
import propiedadesData from '../../data/propiedades.json'

import img1 from '../../assets/img/IMG-20240107-WA0047.jpg';
import img2 from '../../assets/img/IMG-20240107-WA0060.jpg';
import img3 from '../../assets/img/IMG-20240107-WA0063.jpg';
import img4 from '../../assets/img/IMG-20240107-WA0063.jpg';
import img5 from '../../assets/img/IMG-20240107-WA0060.jpg';

const imageMap = {
  img1,
  img2,
  img3,
  img4,
  img5
};

function Properties() {
  const propiedadesConImagenes = propiedadesData.map(prop => {
    const imagenesArray = prop.imagenes 
      ? prop.imagenes.map(imgKey => imageMap[imgKey] || img1)
      : [imageMap[prop.imagen_src] || img1];

    return {
      ...prop,
      imagen_src: imageMap[prop.imagen_src] || img1,
      images: imagenesArray
    };
  });

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
      <div className="app-header">
        <Filter        
          texto="Buscar por descripción, ciudad o dirección..." 
          propiedades={propiedadesConImagenes}
          onFiltrar={aplicarFiltros}
          tipo="propiedades"
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
              direccion={prop.direccion}
              valor={prop.precio}
              tipo={prop.tipo}
              images={prop.images}
              ciudad={prop.ciudad}
              habitacion_principal={prop.features.habitaciones.principal}
              habitacion_secundaria={prop.features.habitaciones.secundaria}
              tipo_operacion={prop.tipo_operacion}
              habitaciones={totalHabitaciones}
              estacionamientos={prop.features.estacionamientos}
              dormitorios={prop.features.dormitorios}
              item='properties'
            />
          );
        })}
      </div>
    </>
  );
}

export default Properties;