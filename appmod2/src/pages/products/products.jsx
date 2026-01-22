import { useState, useEffect } from 'react'
import { Card, Filter, CardSkeleton } from '../../components/index.ts'



function Products() {
  const [productos, setProductosState] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const [response] = await Promise.all([
          fetch('https://dummyjson.com/products/?limit=200'),
          new Promise(resolve => setTimeout(resolve, 2500)) // 3.5 segundos mínimo
        ]);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - No se pudieron cargar los productos`);
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
            volumen: volumen || 'N/A',
            volumenCm3: volumenCm3 || 'N/A',
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
        setError(error.message || 'Error desconocido al cargar los productos');
        setLoading(false);
      }
    };

  fetchProducts();

  }, []); // Array de dependencias vacío

  const aplicarFiltros = async (filtrosParams) => {

    setLoadingFiltros(true);    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula retardo de 0.5 segundos
    
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
    setLoadingFiltros(false);

  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Renderizar error
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
          </svg>
          <h2>¡Oops! Algo salió mal</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
        {(loading || loadingFiltros)
          ? Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)
          : filtros.length > 0
          ? filtros.map((prod) => (
            <Card
              key={prod.id}
              src={prod.imagen_src}
              titulo={prod.titulo}
              marca={prod.marca}
              valor={prod.precio}
              categoria={prod.categoria}
              images={prod.images}
              descripcion={prod.descripcion}
              stock={prod.stock}              
              item='products'
              volumen={prod.volumen}
              volumenCm3={prod.volumenCm3}
              sku={prod.sku}
              peso={prod.peso}
              garantia={prod.garantia}
              dimensiones={prod.dimensiones}
              discountPercentage={prod.descuento}
              rating={prod.rating}

            />
          ))
          : (
                <div className="no-results">
                  <p>No se encontraron productos con los filtros aplicados</p>
                </div>
              )
        }
      </div>
    </>
  );
}

export default Products;