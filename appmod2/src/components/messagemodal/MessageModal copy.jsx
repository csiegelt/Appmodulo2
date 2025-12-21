import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './messagemodal.css';

export function MessageModal({ message, onClose }) {
  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Evitar scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Cerrar modal al hacer clic en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Renderizar el modal fuera del Card
  return createPortal(
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Detalles de la Propiedad</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          {message.split('\n').map((line, index) => (
            line.trim() && <p key={index}>{line}</p>
          ))}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body // Se renderiza directamente en el body
  );
}