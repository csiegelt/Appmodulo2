import React from 'react';

export function ProductDetails({data}) {

    return (

        <>
            <p><strong>producto:</strong> {data.titulo}</p>
            <p><strong>precio:</strong> ${data.valor}</p>
            <p><strong>categoría:</strong> {data.categoria}</p>
            <p><strong>marca:</strong> {data.marca}</p>
            <p><strong>stock:</strong> {data.stock}</p>
            <p><strong>dimensiones:</strong> {data.dimensiones ? `${data.dimensiones.width} x ${data.dimensiones.height} x ${data.dimensiones.depth} cm` : 'N/A'}</p>
            <p><strong>volumen:</strong> {data.volumen + ' (' + data.volumenCm3 + ')'}</p>
            <p><strong>SKU:</strong> {'# ' + data.sku}</p>
            <p><strong>peso:</strong> {data.peso}</p>
            <p><strong>garantía:</strong> {data.garantia}</p>
            <p><strong>descuento:</strong> {data.discountPercentage}%</p>
            <p><strong>calificación:</strong> {data.rating} / 5</p>
            <p><strong>descripción:</strong> {data.descripcion}</p>

        </>
    );
}