import { useState, useEffect } from 'react'
import { Card, Filter } from '../../components/index.ts'



function Products() {
  const [productos, setProductosState] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const data = await response.json();

        console.log('Data completa:', data);
       
        const productosConImagenes = data.products.map(prod => ({
          id: prod.id,
          titulo: prod.title,
          descripcion: prod.description,
          precio: prod.price,
          categoria: prod.category,
          marca: prod.brand,
          stock: prod.stock,
          imagen_src: prod.thumbnail,
          images: prod.images || [prod.thumbnail]
        }));
      
        console.log('Productos procesados:', productosConImagenes);

        setProductosState(productosConImagenes);
        setFiltros(productosConImagenes);
        setLoading(false);
      } catch (error) {
        console.error('Error capturado:', error);
        setError(error.message);
        setLoading(false);
      }
    };

  fetchProducts();

  }, []); // Array de dependencias vacío

  const aplicarFiltros = (filtros) => {
    let resultado = [...productos];

    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const busqueda = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(prod =>
        prod.descripcion.toLowerCase().includes(busqueda) ||
        prod.titulo.toLowerCase().includes(busqueda) ||
        prod.categoria.toLowerCase().includes(busqueda) ||
        prod.marca.toLowerCase().includes(busqueda)
      );
    }

    if (filtros.categoria && filtros.categoria !== 'todas') {
      resultado = resultado.filter(prod => prod.categoria === filtros.categoria);
    }

    if (filtros.marca && filtros.marca !== 'todos') {
      resultado = resultado.filter(prod => prod.marca === filtros.marca);
    }

    setProductosState(resultado);
  };

  return (
    <>
      <div className="app-header">
        
        <Filter        
          texto="Buscar por descripción, ciudad o dirección..." 
          propiedades={productos}
          onFiltrar={aplicarFiltros}
        />
      </div>
      
      <div className="grid">          
        {productos.map((prod) => {
          
          return (
            <Card
              key={prod.id}
              src={prod.imagen_src}
              descripcion={prod.titulo}
              direccion={prod.marca}
              valor={prod.precio}
              tipo={prod.categoria}
              images={prod.images}
              ciudad={`Stock: ${prod.stock}`}
              habitacion_principal={0}
              habitacion_secundaria={0}
              tipo_operacion="Venta"
              habitaciones={0}
              estacionamientos={0}
              dormitorios={0}
            />
          );
        })}
      </div>
    </>
  );
}

export default Products;