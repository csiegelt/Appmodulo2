import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
                // Contenido Productos
                <>
                  <p><strong>Producto:</strong> {itemData.titulo}</p>
                  <p><strong>Precio:</strong> $ {itemData.valor?.toLocaleString('es-CL')}</p>
                  <p><strong>Categoría:</strong> {itemData.categoria}</p>
                  <p><strong>Marca:</strong> {itemData.marca}</p>
                  <p><strong>Stock disponible:</strong> {itemData.stock} unidades</p>
                  <p><strong>Dimensiones:</strong> {itemData.dimensiones ? `${itemData.dimensiones.width} x ${itemData.dimensiones.height} x ${itemData.dimensiones.depth} cm` : 'N/A'}</p>
                  <p><strong>Volumen:</strong> {itemData.volumen + ' (' + itemData.volumenCm3 + ')'}</p>
                  <p><strong>SKU:</strong> {'# ' + itemData.sku}</p>
                  <p><strong>Peso:</strong> {itemData.peso}</p>
                  <p><strong>Garantía:</strong> {itemData.garantia}</p>
                  <p><strong>Descuento:</strong> {itemData.discountPercentage}%</p>
                  <p><strong>Rating:</strong> {itemData.rating} / 5</p>

                </>
              ) : (
                // Contenido Propiedades
                <>
                  <p><strong>Valor:</strong> $ {itemData.valor?.toLocaleString('es-CL')}</p>
                  <p><strong>Ciudad:</strong> {itemData.ciudad}</p>
                  <p><strong>Tipo operación:</strong> {itemData.tipo_operacion}</p>
                  <p><strong>Dirección:</strong> {itemData.direccion}</p>
                  <p><strong>Tipo:</strong> {itemData.tipo}</p>
                  <p><strong>Habitaciones:</strong> {itemData.habitaciones}</p>
                  <p><strong>Hab. Principal:</strong> {itemData.habitacion_principal}</p>
                  <p><strong>Hab. Secundaria:</strong> {itemData.habitacion_secundaria}</p>
                  <p><strong>Dormitorios:</strong> {itemData.dormitorios}</p>
                  <p><strong>Estacionamientos:</strong> {itemData.estacionamientos}</p>
                </>
              )}
            </div>
          )}

          {/* Mensaje tradicional (fallback) */}
          {!itemData && message && (
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