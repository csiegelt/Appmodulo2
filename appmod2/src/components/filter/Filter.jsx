import React, { useState } from 'react';
import './filter.css'; 

export function Filter({

    texto,
    propiedades = [], // Recibe las propiedades para extraer valores únicos
    productos = [],
    onFiltrar,
    tipo = 'propiedades' // 'propiedades' o 'productos'
   
     
}) {
  
  const items = tipo === 'productos' ? productos : propiedades;

  const [filtros, setFiltros] = useState({
    busqueda: '',
    ciudad: 'todas',
    tipo: 'todos',       

  });


  // Extrae unica ciudad
  //const ciudadesDisponibles = [...new Set(items.map(item => item.ciudad))].sort();
  
  // Extrae unico tipo
  //const tiposDisponibles = [...new Set(items.map(item => item.tipo))].sort();

  const primerSelect = tipo === 'productos' 
    ? [...new Set(items.map(item => item.categoria))].sort()
    : [...new Set(items.map(item => item.ciudad))].sort();

  const segundoSelect = tipo === 'productos'
  ? [...new Set(items.map(item => item.marca))].sort()
  : [...new Set(items.map(item => item.tipo))].sort();

  // Select dinámicos
  const labels = tipo === 'productos' 
    ? {
        primera: 'Todas las categorías',
        segunda: 'Todas las marcas',
        campo1: 'categoria',
        campo2: 'marca'
      }
    : {
        primera: 'Todas las ciudades',
        segunda: 'Todos los tipos',
        campo1: 'ciudad',
        campo2: 'tipo'
      };



  const handleChange = (campo, valor) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    
    // Enviar filtros al componente padre
    if (onFiltrar) {
      onFiltrar(nuevosFiltros);
    }
  };

  const limpiarFiltros = () => {
    const filtrosVacios = {
      busqueda: '',
      ciudad: 'todas',
      tipo: 'todos'
    };
    setFiltros(filtrosVacios);
    
    if (onFiltrar) {
      onFiltrar(filtrosVacios);
    }
  };

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        
        {/* filtro input */}
        <div className="filter-input-group">
          <input
            type="text"
            placeholder={texto || "Buscar ..."}
            value={filtros.busqueda}
            onChange={(e) => handleChange('busqueda', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* filtro select ciudad o categoria */}
        <div className="filter-select-group">
          <select
            value={filtros.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            className="filter-select"
          >
            <option value="todas">{labels.primera}</option>
            {primerSelect.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* filtro select tipo o marca */}
        <div className="filter-select-group">
          <select
            value={filtros.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="filter-select"
          >
            <option value="todos">{labels.segunda}</option>
            {segundoSelect.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Botón limpiar filtros */}
        <button
          type="button"
          onClick={limpiarFiltros}
          className="filter-clear-btn"
        >
          Limpiar
        </button>
      </form>
    </div>
  );
}

