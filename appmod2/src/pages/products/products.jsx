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
       
        const productosConImagenes = data.products.map(prod => {
          
           // Calcular volumen en cm³ y convertir a m³
          let volumen = 'N/A';
          let volumenCm3 = 'N/A';
          
          if (prod.dimensions) {
            const volCm3 = prod.dimensions.width * prod.dimensions.height * prod.dimensions.depth;
            volumenCm3 = `${volCm3.toFixed(2)} cm³`;
            volumen = `${(volCm3 / 1000000).toFixed(2)} m³`;
          }

          return {
            id: prod.id,
            titulo: prod.title || '',
            descripcion: prod.description || '',
            precio: prod.price || 0,
            categoria: prod.category || '',
            marca: prod.brand || 'Sin marca',
            stock: prod.stock || 0,
            imagen_src: prod.thumbnail || '',
            volumen: volumen,
            volumenCm3: volumenCm3,
            images: prod.images || [prod.thumbnail],
            descuento: prod.discountPercentage || 0,
            dimensiones: prod.dimensions || {},
            rating: prod.rating || 0,
            sku: prod.sku || 'N/A',
            peso: prod.weight || 0,
            garantia: prod.warrantyInformation || 'Sin garantía'
          }
        });
      
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

  const aplicarFiltros = (filtrosParams) => {
    let resultado = [...productos];

    if (filtrosParams.busqueda && filtrosParams.busqueda.trim() !== '') {
      const busqueda = filtrosParams.busqueda.toLowerCase();
      resultado = resultado.filter(prod =>
        (prod.descripcion || '').toLowerCase().includes(busqueda) ||
        (prod.titulo || '').toLowerCase().includes(busqueda) ||
        (prod.categoria || '').toLowerCase().includes(busqueda) ||
        (prod.marca || '').toLowerCase().includes(busqueda)
      );
    }

    if (filtrosParams.ciudad && filtrosParams.ciudad !== 'todas') {
      resultado = resultado.filter(prod => prod.categoria === filtrosParams.ciudad);
    }

    if (filtrosParams.tipo && filtrosParams.tipo !== 'todos') {
      resultado = resultado.filter(prod => prod.marca === filtrosParams.tipo);
    }

    setFiltros(resultado);
  };

  return (
    <>
      <div className="app-header">
        
        <Filter        
          texto="Buscar por descripción, título o marca..." 
          productos={productos}
          onFiltrar={aplicarFiltros}
          tipo='productos'
        />
      </div>
      
      <div className="grid">          
        {filtros.map((prod) => {
          
          return (
            <Card
              key={prod.id}
              src={prod.imagen_src}
              titulo={prod.titulo}
              marca={prod.marca}
              valor={prod.precio}
              categoria={prod.categoria}
              images={prod.images}
              stock={`Stock: ${prod.stock}`}              
              item='products'
              volumen={prod.volumen}
              sku={prod.sku}
              peso={prod.peso}
              garantia={prod.garantia}
              dimensiones={prod.dimensiones}
              discountPercentage={prod.descuento}
              rating={prod.rating}

            />
          );
        })}
      </div>
    </>
  );
}

export default Products;