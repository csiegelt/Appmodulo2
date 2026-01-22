import React from 'react';

export function PropertyDetails({ data }) {
  return (
    <>
      <p><strong>Valor:</strong> ${data.valor?.toLocaleString('es-CL')}</p>
      <p><strong>Ciudad:</strong> {data.ciudad}</p>
      <p><strong>Tipo operación:</strong> {data.tipo_operacion}</p>
      <p><strong>Dirección:</strong> {data.direccion}</p>
      <p><strong>Tipo:</strong> {data.tipo}</p>
      <p><strong>Habitaciones:</strong> {data.habitaciones}</p>
      <p><strong>Hab. Principal:</strong> {data.habitacion_principal}</p>
      <p><strong>Hab. Secundaria:</strong> {data.habitacion_secundaria}</p>
      <p><strong>Dormitorios:</strong> {data.dormitorios}</p>
      <p><strong>Baños:</strong> {data.banos}</p>
      <p><strong>Estacionamientos:</strong> {data.estacionamientos}</p>
      {data.descripcion && <p><strong>Descripción:</strong> {data.descripcion}</p>}
    </>
  );
}