import React from 'react';
import './imagenlabel.css';

export function ImagenLabel({ texto, tipo }) {
  // Función para obtener la clase CSS según el tipo
  const getTipoClass = (tipo) => {
    const tipoMap = {
      'Casa': 'tipo-casa',
      'Cabaña': 'tipo-cabana',
      'Parcela': 'tipo-parcela',
      'Departamento': 'tipo-departamento',
      'Terreno': 'tipo-terreno',
      'Local Comercial': 'tipo-local'
    };
    return tipoMap[tipo] || 'tipo-default';
  };
  
  return (
    <div className="imagen-labels-container">
      {/* Label de estado */}
      <div className="imagen-label">
        <span>{texto}</span>
      </div>
      
      {/* Label de tipo (condicional) */}
      {tipo && (
        <div className={`imagen-label-tipo ${getTipoClass(tipo)}`}>
          <span>{tipo}</span>
        </div>
      )}
    </div>
    
  );
}