import React from 'react';
import './buttoncard.css'; 


export function ButtonCard({ 
  text = 'Ver más',
  onClick,
  variant = 'primario',
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