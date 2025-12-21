import React, { useState } from 'react';
import { ImagenLabel } from '../ImagenLabel/ImagenLabel.jsx';
import { MessageModal } from '../messagemodal/MessageModal.jsx';
import './card.css';



export default function Card({  
  src,
  descripcion,
  valor,
  ciudad,
  habitaciones,
  direccion,
  tipo_operacion,
  habitacion_principal,
  habitacion_secundaria,
  estacionamientos,
  tipo,
  dormitorios  

}) {

  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const propertyData = {
    descripcion,
    valor,
    ciudad,
    direccion,
    tipo,
    tipo_operacion,
    imagen_src: src,    
    habitaciones: habitaciones ?? '-',
    habitacion_principal: habitacion_principal ?? '-',
    habitacion_secundaria: habitacion_secundaria ?? '-',
    dormitorios: dormitorios ?? '-',
    estacionamientos: estacionamientos ?? '-'
  };

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
                        <ImagenLabel texto={descripcion} tipo={tipo} />
                      </div>
                      <div className="features-list-front"> 
                        <h4>{descripcion}</h4>
                        <p><strong>Valor:</strong> $ {valor.toLocaleString('es-CL')}</p>
                        <p><strong>Ciudad:</strong> {ciudad}</p>
                        <p><strong>Tipo operación:</strong> {tipo_operacion}</p>
                                       
                      </div>

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
                                            
                      <div className="features-list">
                        <p><strong>Descripción:</strong> {descripcion}</p>
                        <p><strong>Dirección:</strong> {direccion}</p>
                        <p><strong>Valor:</strong> ${valor.toLocaleString('es-CL')}</p>
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
          title={descripcion}
          propertyData={propertyData}
          images={[src]} /* ← Solo pasamos la imagen que ya tenemos */
          onClose={() => setShowModal(false)}
          />
        )}

  </div>
  );
}
