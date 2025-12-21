import React from 'react';
import './buttoncard.css'; 

/**
 * Componente ButtonCard reutilizable
 * @param {string} text - Texto del botón
 * @param {function} onClick - Función a ejecutar al hacer click
 * @param {string} variant - Tipo de botón: 'primary' (frontal) o 'secondary' (trasera)
 * @param {string} className - Clases CSS adicionales
 */
export function ButtonCard({ 
  text = 'Ver más',
  onClick,
  variant = 'primary',
  className = ''
}) {
  
  const buttonClass = `button-card button-card--${variant} ${className}`.trim();

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}