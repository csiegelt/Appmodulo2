import React from 'react';

export function ProductDetails({data}) {

    return (

        <>
            <p><strong>Product:</strong> {data.titulo}</p>
            <p><strong>Price:</strong> ${data.valor}</p>
            <p><strong>Category:</strong> {data.categoria}</p>
            <p><strong>Brand:</strong> {data.marca}</p>
            <p><strong>Stock:</strong> {data.stock}</p>
            <p><strong>Dimensions:</strong> {data.dimensiones ? `${data.dimensiones.width} x ${data.dimensiones.height} x ${data.dimensiones.depth} cm` : 'N/A'}</p>
            <p><strong>Volume:</strong> {data.volumen + ' (' + data.volumenCm3 + ')'}</p>
            <p><strong>SKU:</strong> {'# ' + data.sku}</p>
            <p><strong>Weight:</strong> {data.peso}</p>
            <p><strong>Warranty:</strong> {data.garantia}</p>
            <p><strong>Discount:</strong> {data.discountPercentage}%</p>
            <p><strong>Rating:</strong> {data.rating} / 5</p>
            <p><strong>Description:</strong> {data.descripcion}</p>

        </>
    );
}