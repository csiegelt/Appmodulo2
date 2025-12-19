import React, { useState } from 'react';
import { ImagenLabel } from '../ImagenLabel/ImagenLabel.jsx';
import { MessageModal } from '../messagemodal/MessageModal.jsx';
import './card.css';



export default function Card({  
  src,
  descripcion,
  valor,
  habitaciones,
  habitacion_principal,
  habitacion_secundaria,
  estacionamientos,
  dormitorios  

}) {

  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (

    <div
      className="card-3d"
      onClick={() => setFlipped(s => !s)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped(s => !s); }}
      aria-pressed={flipped}
    >

        <div className={`card-inner ${flipped ? 'is-flipped' : ''}`}>
                    {/* CARA FRONTAL */}
                    <div className="card card-front">
                      <div className="imagen_contenedor">
                        <img
                          src={src || '/img/placeholder.png'}
                          alt={descripcion || 'imagen'}
                          className="card-image"
                        />
                        <ImagenLabel texto={descripcion} />
                      </div>

                      <h5>{/*descripcion*/}</h5>
                      <p>Valor: ${valor}</p>

                      {/* renderiza los children (features u otros) */}
                     

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowModal(true);
                        }}
                      >
                        Ver más
                      </button>
                    </div>

                    {/* CARA TRASERA */}
                    <div className="card card-back">
                      
                        <ImagenLabel texto="Información Detallada" />
                      

                      <h5>Información detallada</h5>
                      <div className="features-list">
                        <p><strong>Descripción:</strong> {descripcion}</p>
                        <p><strong>Valor:</strong> ${valor}</p>
                        <p><strong>Habitaciones:</strong> {habitaciones ?? '-'}</p>
                        <p><strong>Habitación Principal:</strong> {habitacion_principal ?? '-'}</p>
                        <p><strong>Habitación Secundaria:</strong> {habitacion_secundaria ?? '-'}</p>

                        <p><strong>Estacionamientos:</strong> {estacionamientos ?? '-'}</p>
                        <p><strong>Dormitorios:</strong> {dormitorios ?? '-'}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipped(false);
                        }}
                      >
                        Volver
                      </button>
                    </div>
        </div>

        {showModal && (
          <MessageModal
            message={`Código: ${descripcion} - $${valor}. ${habitaciones.principal + habitaciones.secundaria} habitaciones, ${estacionamientos} estacionamientos, ${dormitorios} dormitorios.`}
            onClose={() => setShowModal(false)}
          />
        )}

  </div>
  );
}
