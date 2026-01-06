# 🏡 AppModulo2 - Portal Inmobiliario Chiloé

## Descripción

Portal inmobiliario enfocado en propiedades de la Isla de Chiloé, Chile. Plataforma que permite visualizar, filtrar y navegar entre diferentes tipos de propiedades (casas, cabañas, parcelas, departamentos y locales comerciales) disponibles para venta o arriendo en las comunas de Ancud, Castro, Quellón y Dalcahue.

El proyecto incluye un sistema de filtrado dinámico, paginación y visualización de tarjetas con información detallada de cada propiedad.

---

## Componentes Creados

### 1. **Card** (`src/components/card/Card.jsx`)
- Tarjeta 3D con efecto flip al hacer clic
- Vista frontal: imagen, descripción, precio y características básicas
- Vista trasera: información detallada de la propiedad
- Integración con modal para galería de imágenes
- Etiquetas de estado dinámicas
- Diseño responsive adaptativo

### 2. **ButtonCard** (`src/components/button/ButtonCard.jsx`)
- Componente de botón reutilizable para las cards
- Variante `primary`: botón "Ver más" para abrir modal (gradiente morado)
- Variante `secondary`: botón "Volver" para regresar a vista frontal (gradiente rosa)
- Efectos hover y transiciones suaves
- Estilos personalizados según contexto

### 3. **MessageModal** (`src/components/messagemodal/MessageModal.jsx`)
- Modal con slider de imágenes
- Navegación entre múltiples fotos de la propiedad
- Indicadores de posición en el slider
- Información completa de la propiedad
- Botones de navegación responsivos
- Diseño optimizado para móvil

### 4. **Filter** (`src/components/filter/Filter.jsx`)
- Input de búsqueda por texto
- Select dinámico para filtrar por ciudad
- Select dinámico para filtrar por tipo de propiedad
- Botón para limpiar filtros
- Filtros basados en datos del JSON

### 5. **NavMenu** (`src/components/Nav/NavMenu.jsx`)
- Barra de navegación principal
- Logo del proyecto
- Links de navegación
- Menú hamburguesa responsive


### 6. **ImagenLabel** (`src/components/imagenlabel/ImagenLabel.jsx`)
- Etiqueta superpuesta en las imágenes
- Muestra tipo de propiedad y descripción
- Diseño semitransparente con backdrop-filter
- Colores dinámicos según estado

### 7. **Footer** (`src/components/Footer/Footer.jsx`)
- Pie de página informativo y completo
- Sección "Sobre nosotros" con descripción de la empresa
- Enlaces rápidos a todas las secciones del sitio
- Sección de servicios con links directos
- Información de contacto (dirección, teléfono, email)
- Iconos SVG de redes sociales (Facebook, Instagram, Twitter)
- Copyright dinámico con año actual
- Diseño responsive con grid layout


---

## Instrucciones para Ejecutar el Proyecto

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/csiegelt/appmodulo2.git
cd appmodulo2
```

2. **Navegar a la carpeta del frontend**
```bash
cd appmod2
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Ejecutar el proyecto en modo desarrollo**
```bash
npm run dev
```

### Build para producción

```bash
npm run build
```

---

## Tecnologías Usadas

### Frontend
- **React** 18.3.1 - Biblioteca para construir interfaces de usuario
- **Vite** 5.4.10 - Build tool y dev server ultra rápido
- **JavaScript (ES6+)** - Lenguaje de programación

### Estilos
- **CSS3** - Estilos personalizados
- **CSS Modules** - Estilos con scope por componente
- **Flexbox & Grid** - Layouts responsive

### Estado y Lógica
- **React Hooks** - useState, useEffect
- **Props** - Comunicación entre componentes

### Datos
- **JSON** - Mock de datos de propiedades
- **ES6 Modules** - Importación/exportación de módulos

### Herramientas de Desarrollo
- **ESLint** - Linter para mantener código limpio
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

---

## Capturas de Pantalla

### Vista Principal
![Vista Principal](./screenshots/PrincipalCard.jpg)
*Página principal con tarjetas de propiedades y filtros*

### Sistema de Filtros
![Filtros](./screenshots/PrincipalCardFilterFlipped.jpg)
*Filtros dinámicos por texto, ciudad y tipo de propiedad*

### Tarjeta con Modal
![Modal](./screenshots/ShowCardModal.jpg)
*Detalle completo de la propiedad en modal*

### Vista Responsive
![Mobile](./screenshots/Movil.jpg)
*Diseño adaptativo para dispositivos móviles*

---

## Estructura del Proyecto

```
appmodulo2/
├── appmod2/                        # Aplicación React
│   ├── src/
│   │   ├── assets/                # Recursos estáticos
│   │   │   ├── img/               # Imágenes de propiedades
│   │   │   └── screenshots/       # Capturas de pantalla
│   │   │   
│   │   ├── components/            # Componentes reutilizables
│   │   │   ├── button/            # ButtonCard component
│   │   │   │   ├── ButtonCard.jsx
│   │   │   │   └── buttoncard.css
│   │   │   ├── card/              # Card 3D component
│   │   │   │   ├── Card.jsx
│   │   │   │   └── card.css
│   │   │   ├── filter/            # Filter component
│   │   │   │   ├── Filter.jsx
│   │   │   │   └── filter.css
│   │   │   ├── Footer/            # Footer component
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── footer.css
│   │   │   ├── imagenlabel/       # ImagenLabel component
│   │   │   │   ├── ImagenLabel.jsx
│   │   │   │   └── imagenlabel.css
│   │   │   ├── messagemodal/      # Modal component
│   │   │   │   ├── MessageModal.jsx
│   │   │   │   └── messagemodal.css
│   │   │   ├── Nav/               # Navigation component
│   │   │   │   ├── NavMenu.jsx
│   │   │   │   └── navmenu.css
│   │   │   └── index.ts           # Barrel exports
│   │   ├── data/                  # Datos JSON
│   │   │   └── propiedades.json   # 13 propiedades mock
│   │   ├── App.jsx                # Componente raíz
│   │   ├── App.css                # Estilos globales
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # CSS base
│   ├── public/                    # Archivos públicos estáticos
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencias del proyecto
│   ├── vite.config.js             # Configuración Vite
│   └── eslint.config.js           # Configuración ESLint
└── README.md                      # Documentación del proyecto
```

---

## Funcionalidades Principales

✅ **Tarjetas 3D interactivas** con efecto flip al hacer clic  
✅ **Sistema de filtrado avanzado** por texto, ciudad y tipo de propiedad  
✅ **Modal con galería de imágenes** y navegación entre fotos  
✅ **Botones reutilizables** con variantes primaria/secundaria  
✅ **Diseño responsivo** optimizado para móvil, tablet y desktop  
✅ **Navegación fluida** con scroll suave y transiciones  
✅ **Etiquetas dinámicas** superpuestas en imágenes  
✅ **Selects dinámicos** generados desde datos  
✅ **Optimización de imágenes** con object-fit y lazy loading  
✅ **Efectos visuales modernos** con gradientes y backdrop-filter  

---

## Datos del Mock

El proyecto incluye **13 propiedades** distribuidas en:
- **Ciudades**: Ancud, Castro, Quellón, Dalcahue
- **Tipos**: Casa, Cabaña, Parcela, Departamento, Terreno, Local Comercial
- **Operaciones**: Venta, Arriendo

---

## 👨‍💻 Autor

**Carlos Siegel**
- GitHub: [@csiegelt](https://github.com/csiegelt)

---

## Próximas Mejoras posibles

- [ ] Dashboard de administración para gestión de propiedades
- [ ] Conexión con base de datos (PostgreSQL/MySQL)
- [ ] Backend con Node.js y Express
- [ ] Sistema de autenticación y autorización
- [ ] CRUD completo de propiedades desde el dashboard
- [ ] Integración con API REST
- [ ] Mapa interactivo de ubicaciones con Google Maps
- [ ] Filtros avanzados (rango de precio, metros cuadrados, antigüedad)
- [ ] Sistema de contacto con el vendedor
- [ ] Comparador de propiedades
- [ ] Exportación de datos a PDF
- [ ] Notificaciones por email
- [ ] Panel de estadísticas y métricas


---

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

## Si te gustó el proyecto, no olvides darle una estrella en GitHub!**
