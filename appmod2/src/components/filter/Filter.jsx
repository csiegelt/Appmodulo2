import React, { useState } from 'react';
import './filter.css'; 

export function Filter({
     texto,
     propiedades = [], // Recibe las propiedades para extraer valores únicos
     onFiltrar
     
}) {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    ciudad: 'todas',
    tipo: 'todos',       

  });


  // Extrae unica ciudad
  const ciudadesDisponibles = [...new Set(propiedades.map(prop => prop.ciudad))].sort();
  
  // Extrae unico tipo
  const tiposDisponibles = [...new Set(propiedades.map(prop => prop.tipo))].sort();

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
            placeholder={texto || "Buscar propiedades..."}
            value={filtros.busqueda}
            onChange={(e) => handleChange('busqueda', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* filtro select ciudad */}
        <div className="filter-select-group">
          <select
            value={filtros.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas las ciudades</option>
            {ciudadesDisponibles.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        {/* filtro select tipo */}
        <div className="filter-select-group">
          <select
            value={filtros.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los tipos</option>
            {tiposDisponibles.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
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

