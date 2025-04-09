# Dashboard de Ecommerce

## Estructura del Proyecto

El proyecto está organizado siguiendo la estructura de directorios de Next.js con la arquitectura App Router:

```
next-ecommerce-dashboard/
├── node_modules/         # Dependencias del proyecto
├── public/               # Archivos estáticos accesibles públicamente
├── src/                  # Código fuente de la aplicación
│   ├── app/              # Páginas y rutas de la aplicación
│   │   ├── dashboard/    # Páginas del dashboard
│   │   │   ├── page.tsx              # Página principal del dashboard
│   │   │   ├── productos/page.tsx    # Página de productos
│   │   │   ├── pedidos/page.tsx      # Página de pedidos
│   │   │   ├── clientes/page.tsx     # Página de clientes
│   │   │   └── estadisticas/page.tsx # Página de estadísticas
│   │   ├── globals.css   # Estilos globales
│   │   ├── layout.tsx    # Layout principal de la aplicación
│   │   └── page.tsx      # Página de inicio
│   ├── components/       # Componentes reutilizables
│   │   ├── dashboard/    # Componentes específicos del dashboard
│   │   │   └── DashboardLayout.tsx   # Layout común para todas las páginas del dashboard
│   │   └── ui/           # Componentes de interfaz de usuario
│   │       ├── Chart.tsx             # Componente para visualizar gráficos
│   │       ├── Header.tsx            # Encabezado del dashboard
│   │       ├── ProductCard.tsx       # Tarjeta para mostrar productos
│   │       ├── Sidebar.tsx           # Barra lateral de navegación
│   │       ├── SidebarLink.tsx       # Enlaces de la barra lateral
│   │       ├── StatCard.tsx          # Tarjeta para mostrar estadísticas
│   │       └── Table.tsx             # Tabla para mostrar datos
│   └── lib/              # Utilidades y hooks
│       └── hooks.ts      # Hooks personalizados para gestionar datos
├── .eslintrc.json        # Configuración de ESLint
├── .gitignore            # Archivos ignorados por Git
├── next.config.mjs       # Configuración de Next.js
├── package.json          # Dependencias y scripts del proyecto
├── postcss.config.mjs    # Configuración de PostCSS
├── tailwind.config.js    # Configuración de Tailwind CSS
└── tsconfig.json         # Configuración de TypeScript
```

## Tecnologías Utilizadas

- **Next.js**: Framework de React para desarrollo web
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de CSS utilitario
- **React**: Biblioteca para construir interfaces de usuario

## Componentes Principales

### Layouts

- **DashboardLayout**: Layout común para todas las páginas del dashboard, incluye la barra lateral y el encabezado.

### Componentes UI

- **Sidebar**: Barra lateral de navegación con enlaces a las diferentes secciones.
- **Header**: Encabezado del dashboard con título y acciones.
- **StatCard**: Tarjeta para mostrar estadísticas con tendencias.
- **Table**: Componente para mostrar datos tabulares.
- **Chart**: Componente para visualizar datos en gráficos.
- **ProductCard**: Tarjeta para mostrar información de productos.

### Hooks Personalizados

- **useProductos**: Hook para gestionar datos de productos, incluye funciones para filtrar, ordenar y buscar.
- **usePedidos**: Hook para gestionar datos de pedidos, incluye funciones para filtrar, ordenar y buscar.
- **useClientes**: Hook para gestionar datos de clientes, incluye funciones para filtrar, ordenar y buscar.

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd next-ecommerce-dashboard
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre http://localhost:3000 en tu navegador para ver la aplicación.

### Compilación para Producción

1. Compila la aplicación:
   ```bash
   npm run build
   ```

2. Inicia el servidor de producción:
   ```bash
   npm run start
   ```

## Cómo Modificar el Proyecto

### Añadir Nuevas Páginas

1. Crea un nuevo archivo en `src/app/dashboard/nueva-pagina/page.tsx`.
2. Utiliza el componente `DashboardLayout` como contenedor.
3. Añade el enlace a la nueva página en el componente `Sidebar`.

### Modificar Estilos

- Los estilos globales se encuentran en `src/app/globals.css`.
- La configuración de Tailwind CSS está en `tailwind.config.js`.
- Puedes personalizar colores, fuentes y otros estilos modificando estos archivos.

### Añadir Nuevos Componentes

1. Crea un nuevo archivo en `src/components/ui/` o `src/components/dashboard/`.
2. Exporta el componente como predeterminado.
3. Importa y utiliza el componente en las páginas necesarias.

### Modificar Datos

Los datos de ejemplo se encuentran en `src/lib/hooks.ts`. Puedes modificar:

- `productosData`: Datos de productos
- `pedidosData`: Datos de pedidos
- `clientesData`: Datos de clientes

Para conectar con una API real, modifica los hooks personalizados para realizar peticiones a tu backend.

## Características Implementadas

- **Diseño Responsivo**: Funciona en dispositivos móviles y de escritorio.
- **Modo Oscuro**: Soporte para tema claro y oscuro.
- **Filtrado y Búsqueda**: En todas las páginas de datos (productos, pedidos, clientes).
- **Visualización de Datos**: Gráficos y estadísticas para análisis.
- **Navegación Intuitiva**: Barra lateral para acceder a todas las secciones.

## Próximas Mejoras Sugeridas

- Implementar autenticación de usuarios.
- Conectar con una API real para obtener datos dinámicos.
- Añadir funcionalidad de exportación de datos a CSV/Excel.
- Implementar notificaciones en tiempo real.
- Añadir más tipos de gráficos para análisis avanzado.
