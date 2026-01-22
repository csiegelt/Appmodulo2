import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ProductDetails } from "./ProductDetails";
import { PropertyDetails } from "./PropertyDetails";
import { ButtonCard } from "../button/ButtonCard";
import { DEFAULT_TITLE, BUTTON_LABELS, ARIA_LABELS } from "./MessageModal.constants.js";
import './messagemodal.css';

export function MessageModal({ 
  message, 
  onClose,
  title = "Detalles del ítem",
  images = [],
  itemData,
  item = 'properties'
}) {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const isProduct = item === 'products';

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
          
          {itemData && (
            <div className="modal-info-simple">
              {isProduct ? (
                
                <>
                    <ProductDetails data={itemData} />
                </>
              ) : (                
                <>
                    <PropertyDetails data={itemData} />
                </>
              )}
            </div>
          )}
          
          {!itemData && message && (
            <div>
              {message.split('\n').map((line, index) => (
                line.trim() && <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <ButtonCard
            text={BUTTON_LABELS.close}
            onClick={onClose}
            variant="primario"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}