import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './messagemodal.css';

export function MessageModal({ 
  message, 
  onClose,
  title = "Detalles de la Propiedad",
  images = [],
  propertyData
}) {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    e.stopPropagation(); // Detiene la propagación del Modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return createPortal(
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Slider */}
        {images && images.length > 0 && (
          <div className="modal-slider-container">
            <img 
              src={images[currentImageIndex]} 
              alt={`${title} - Imagen ${currentImageIndex + 1}`}
              className="modal-slider-image"
            />
             
            {images.length > 1 && (
              <>
                <button 
                  className="modal-slider-btn modal-slider-prev" 
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button 
                  className="modal-slider-btn modal-slider-next" 
                  onClick={nextImage}
                  aria-label="Imagen siguiente"
                >
                  ›
                </button>
                <div className="modal-slider-indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`modal-slider-indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        
        <div className="modal-body">
         
          <h2 className="modal-title">{title}</h2>
          
          {propertyData && (
            <div className="modal-info-simple">
              <p><strong>Valor:</strong> $ {propertyData.valor.toLocaleString('es-CL')}</p>
              <p><strong>Ciudad:</strong> {propertyData.ciudad}</p>
              <p><strong>Tipo operación:</strong> {propertyData.tipo_operacion}</p>
              <p><strong>Dirección:</strong> {propertyData.direccion}</p>
              <p><strong>Tipo:</strong> {propertyData.tipo}</p>
              <p><strong>Habitaciones:</strong> {propertyData.habitaciones}</p>
              <p><strong>Hab. Principal:</strong> {propertyData.habitacion_principal}</p>
              <p><strong>Hab. Secundaria:</strong> {propertyData.habitacion_secundaria}</p>
              <p><strong>Dormitorios:</strong> {propertyData.dormitorios}</p>
              <p><strong>Estacionamientos:</strong> {propertyData.estacionamientos}</p>
            </div>
          )}

          {/* Mensaje tradicional (fallback) */}
          {!propertyData && message && (
            <div>
              {message.split('\n').map((line, index) => (
                line.trim() && <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-action" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}