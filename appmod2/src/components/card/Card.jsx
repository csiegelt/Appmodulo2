import React, { useState } from 'react';
import { ImagenLabel } from '../imagenlabel/ImagenLabel.jsx';
import { MessageModal } from '../messagemodal/MessageModal.jsx';
import { ButtonCard } from '../button/ButtonCard.jsx';
import './card.css';



export default function Card({  
  src,
  descripcion,
  valor,
  ciudad,
  images = [],
  habitaciones,
  direccion,
  tipo_operacion,
  habitacion_principal,
  habitacion_secundaria,
  estacionamientos,
  tipo,
  dormitorios,
  item='properties' ,
  titulo ,
  stock,
  categoria ,  
  marca,
  volumen,
  volumenCm3,
  dimensiones,
  sku,
  peso,
  garantia,
  discountPercentage,
  rating


}) {

  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const isProduct = item === 'products';
  const precioDscto = isProduct ? valor - (valor * (discountPercentage / 100)) : null;

  const itemData = isProduct ? {
      titulo,
      valor,
      stock,
      categoria,
      marca,
      garantia,
      discountPercentage,
      rating,
      volumen,
      volumenCm3,
      dimensiones,
      sku,
      peso,
      precioDscto,      
      imagen_src: src } :
      {
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
    
  
  

  //const modalImages = images.length > 0 ? images : [src];

  /*-------------DEBUG CONSOLA----------- */
  // console.log('Card - images recibidas:', images);
  // console.log('Card - modalImages:', modalImages);

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
                  alt={isProduct ? titulo : descripcion}
                  className="card-image"
                />
                <ImagenLabel texto={isProduct ? titulo : descripcion} tipo={isProduct ? categoria : tipo} item={item} />
              </div>
              <div className="features-list-front"> 
                {isProduct ? (
                  <>
                    <h4>{titulo}</h4>                                      
                    <p><strong>Precio:</strong> $ {valor?.toLocaleString('es-CL')} {precioDscto ? `(Dscto: $${precioDscto.toLocaleString('es-CL')})` : ''}</p>
                    <p><strong>Marca:</strong> {marca}</p>
                    <p><strong>Categoría:</strong> {categoria}</p>
                    <p><strong>Sku:</strong> {'# ' + sku}</p>
                  </>
                ) : (
                  <>
                    <h4>{descripcion}</h4>
                    <p><strong>Valor:</strong> $ {valor?.toLocaleString('es-CL')}</p>
                    <p><strong>Ciudad:</strong> {ciudad}</p>
                    <p><strong>Tipo operación:</strong> {tipo_operacion}</p>
                  </>
                )}
              </div>

              <ButtonCard
                text="Ver más"
                variant="primario"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              />
            </div>

            {/* CARA TRASERA */}
            <div className="card card-back">
              
             <ImagenLabel texto={isProduct ? "Detalles del Producto" : "Información Detallada"} />
                                    
              <div className="features-list">
                {isProduct ? (
                  <>
                    <p><strong>Título:</strong> {titulo}</p>
                    <p><strong>Precio:</strong> $ {valor.toLocaleString('es-CL')}</p>
                    <p><strong>Categoría:</strong> {categoria}</p>
                    <p><strong>Marca:</strong> {marca}</p>
                    <p><strong>Stock:</strong> {stock}</p>                    
                    <p><strong>Garantía:</strong> {garantia}</p>
                    <p><strong>Descuento:</strong> {discountPercentage}%</p>
                    <p><strong>Rating:</strong> {rating} / 5</p>
                  </>
                ) : (
                  <>  
                <p><strong>Descripción:</strong> {descripcion}</p>
                <p><strong>Dirección:</strong> {direccion}</p>
                <p><strong>Valor:</strong> ${valor.toLocaleString('es-CL')}</p>
                <p><strong>Habitaciones:</strong> {habitaciones ?? '-'}</p>
                <ul>                          
                  <li>Habitación Principal: {habitacion_principal ?? '-'}</li>
                  <li>Habitación Secundaria: {habitacion_secundaria ?? '-'}</li>
                </ul>
                <p><strong>Estacionamientos:</strong> {estacionamientos ?? '-'}</p>
                <p><strong>Dormitorios:</strong> {dormitorios ?? '-'}</p>
              
              </>
                )}
              </div>

              <ButtonCard
                text="Volver"
                variant="secundario"
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
              />
            </div>
        </div>

        {showModal && (
          <MessageModal
          title={isProduct ? titulo : descripcion}
          itemData={itemData}
          images={images.length > 0 ? images : [src]} 
          onClose={() => setShowModal(false)}
          item={item}
        />
      )}

  </div>
  );
}
