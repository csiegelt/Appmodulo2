# 🏡 AppModulo2 - Portal Inmobiliario Chiloé

## 📋 Descripción

Portal inmobiliario enfocado en propiedades de la Isla de Chiloé, Chile. Plataforma que permite visualizar, filtrar y navegar entre diferentes tipos de propiedades (casas, cabañas, parcelas, departamentos y locales comerciales) disponibles para venta o arriendo en las comunas de Ancud, Castro, Quellón y Dalcahue.

El proyecto incluye un sistema de filtrado dinámico, paginación y visualización de tarjetas con información detallada de cada propiedad.

---

## 🧩 Componentes Creados

### 1. **Card** (`src/components/card/Card.jsx`)
- Tarjeta de propiedad con información principal
- Imagen de la propiedad
- Descripción, precio y características
- Modal con información detallada
- Efecto flip en hover
- Etiquetas de estado (Disponible/Arrendado/Vendido)

### 2. **Filter** (`src/components/filter/Filter.jsx`)
- Input de búsqueda por texto
- Select dinámico para filtrar por ciudad
- Select dinámico para filtrar por tipo de propiedad
- Botón para limpiar filtros
- Filtros basados en datos del JSON

### 3. **Pagination** (`src/components/pagination/Pagination.jsx`)
- Navegación entre páginas
- Botones Anterior/Siguiente
- Botones numerados para cada página
- Indicador de items mostrados
- Scroll suave al cambiar de página

### 4. **NavMenu** (`src/components/Nav/NavMenu.jsx`)
- Barra de navegación principal
- Logo del proyecto
- Links de navegación
- Menú hamburguesa responsive
- Diseño con gradiente azul

### 5. **ImagenLabel** (`src/components/ImagenLabel/ImagenLabel.jsx`)
- Etiqueta de estado para las tarjetas
- Estados: Disponible, Arrendado, Vendido
- Colores dinámicos según estado

---

## 🚀 Instrucciones para Ejecutar el Proyecto

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

5. **Abrir en el navegador**
```
http://localhost:5173
```

### Build para producción

```bash
npm run build
```

El proyecto compilado estará en la carpeta `dist/`

---

## 🛠️ Tecnologías Usadas

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

## 📸 Capturas de Pantalla

### Vista Principal
![Vista Principal](./screenshots/home.png)
*Página principal con tarjetas de propiedades y filtros*

### Sistema de Filtros
![Filtros](./screenshots/filters.png)
*Filtros dinámicos por texto, ciudad y tipo de propiedad*

### Tarjeta con Modal
![Modal](./screenshots/modal.png)
*Detalle completo de la propiedad en modal*

### Paginación
![Paginación](./screenshots/pagination.png)
*Sistema de paginación con 6 propiedades por página*

### Vista Responsive
![Mobile](./screenshots/mobile.png)
*Diseño adaptativo para dispositivos móviles*

---

## 📁 Estructura del Proyecto

```
appmodulo2/
├── appmod2/                    # Frontend React
│   ├── src/
│   │   ├── assets/            # Imágenes y recursos
│   │   │   └── img/           # Imágenes de propiedades
│   │   ├── components/        # Componentes React
│   │   │   ├── card/          # Componente Card
│   │   │   ├── filter/        # Componente Filter
│   │   │   ├── pagination/    # Componente Pagination
│   │   │   ├── Nav/           # Componente NavMenu
│   │   │   ├── ImagenLabel/   # Componente ImagenLabel
│   │   │   └── index.ts       # Exportaciones
│   │   ├── data/              # Datos mock
│   │   │   └── propiedades.json
│   │   ├── App.jsx            # Componente principal
│   │   ├── App.css            # Estilos principales
│   │   └── main.jsx           # Punto de entrada
│   ├── public/                # Recursos públicos
│   ├── package.json           # Dependencias
│   └── vite.config.js         # Configuración de Vite
├── backend/                   # Backend (en desarrollo)
└── README.md                  # Este archivo
```

---

## 🎯 Funcionalidades Principales

✅ Visualización de propiedades en tarjetas (Cards)  
✅ Sistema de filtrado por texto, ciudad y tipo  
✅ Paginación con 6 propiedades por página  
✅ Modal con información detallada  
✅ Diseño responsive (mobile, tablet, desktop)  
✅ Navegación fluida con scroll suave  
✅ Etiquetas de estado dinámicas  
✅ Selects dinámicos basados en datos  

---

## 📊 Datos del Mock

El proyecto incluye **13 propiedades** distribuidas en:
- **Ciudades**: Ancud, Castro, Quellón, Dalcahue
- **Tipos**: Casa, Cabaña, Parcela, Departamento, Terreno, Local Comercial
- **Operaciones**: Venta, Arriendo

---

## 👨‍💻 Autor

**Carlos Siegel**
- GitHub: [@csiegelt](https://github.com/csiegelt)

---

## 📝 Licencia

Este proyecto fue creado como parte del Módulo 2 - Diplomado Full Stack IPSS.

---

## 🔜 Próximas Mejoras

- [ ] Integración con backend (Node.js + Express)
- [ ] Base de datos (PostgreSQL con Prisma)
- [ ] Sistema de autenticación
- [ ] Favoritos de usuarios
- [ ] Mapa de ubicaciones
- [ ] Filtros avanzados (rango de precio, metros cuadrados)
- [ ] Ordenamiento (precio, fecha, popularidad)
- [ ] Comparador de propiedades

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

**⭐ Si te gustó el proyecto, no olvides darle una estrella en GitHub!**
