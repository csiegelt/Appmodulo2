import React from 'react';
import './imagenlabel.css';

export function ImagenLabel({ texto, tipo, item='properties' }) {

  const isProduct = item === 'products';
 

  const getTipoClass = (tipo) => {
    if (isProduct) {
      
      const categoriaMap = {
        'beauty': 'categoria-beauty',
        'fragrances': 'categoria-fragrances',
        'furniture': 'categoria-furniture',
        'groceries': 'categoria-groceries',
        'home-decoration': 'categoria-home',
        'kitchen-accessories': 'categoria-kitchen',
        'laptops': 'categoria-laptops',
        'mens-shirts': 'categoria-mens',
        'mens-shoes': 'categoria-mens',
        'mens-watches': 'categoria-mens',
        'mobile-accessories': 'categoria-mobile',
        'motorcycle': 'categoria-motorcycle',
        'skin-care': 'categoria-skincare',
        'smartphones': 'categoria-smartphones',
        'sports-accessories': 'categoria-sports',
        'sunglasses': 'categoria-sunglasses',
        'tablets': 'categoria-tablets',
        'tops': 'categoria-tops',
        'vehicle': 'categoria-vehicle',
        'womens-bags': 'categoria-womens',
        'womens-dresses': 'categoria-womens',
        'womens-jewellery': 'categoria-womens',
        'womens-shoes': 'categoria-womens',
        'womens-watches': 'categoria-womens'
      };
      return categoriaMap[tipo] || 'categoria-default';
    } else {
      const tipoMap = {
        'Casa': 'tipo-casa',
        'Cabaña': 'tipo-cabana',
        'Parcela': 'tipo-parcela',
        'Departamento': 'tipo-departamento',
        'Terreno': 'tipo-terreno',
        'Local Comercial': 'tipo-local'
      };
    return tipoMap[tipo] || 'tipo-default';
    };
  };
  
  return (
    <div className="imagen-labels-container">
      
      <div className="imagen-label">
        <span>{texto}</span>
      </div>
      
     
      {tipo && (
        <div className={`imagen-label-tipo ${getTipoClass(tipo)}`}>
          <span>{isProduct ? tipo : tipo}</span>
        </div>
      )}
    </div>
    
  );
}