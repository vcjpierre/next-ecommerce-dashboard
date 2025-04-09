"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Hook personalizado para usar localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  // Pasar la función inicial al useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Verificar si estamos en el lado del cliente (browser)
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      // Obtener del localStorage por clave
      const item = window.localStorage.getItem(key);
      // Analizar el JSON almacenado o si es null devolver el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error, devolver el valor inicial
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para que tengamos la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Guardar el estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage (solo en cliente)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // En caso de error registrar el problema
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Definición de tipos para productos
interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string;
}

// Definición de tipos para pedidos
interface Pedido {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  estado: string;
  productos: string[];
}

// Definición de tipos para clientes
interface Cliente {
  id: string;
  nombre: string;
  email: string;
  pedidos: number;
  gastado: number;
  estado: string;
}

// Datos de ejemplo para la funcionalidad de productos
const productosData: Producto[] = [
  { id: 'P001', nombre: 'Smartphone XYZ', categoria: 'Electrónicos', precio: 599.99, stock: 25, imagen: '📱' },
  { id: 'P002', nombre: 'Laptop Ultra', categoria: 'Electrónicos', precio: 1299.99, stock: 12, imagen: '💻' },
  { id: 'P003', nombre: 'Auriculares Bluetooth', categoria: 'Accesorios', precio: 89.99, stock: 50, imagen: '🎧' },
  { id: 'P004', nombre: 'Camiseta Premium', categoria: 'Ropa', precio: 29.99, stock: 100, imagen: '👕' },
  { id: 'P005', nombre: 'Zapatillas Deportivas', categoria: 'Calzado', precio: 119.99, stock: 35, imagen: '👟' },
  { id: 'P006', nombre: 'Reloj Inteligente', categoria: 'Electrónicos', precio: 199.99, stock: 8, imagen: '⌚' },
  { id: 'P007', nombre: 'Cafetera Automática', categoria: 'Hogar', precio: 149.99, stock: 15, imagen: '☕' },
  { id: 'P008', nombre: 'Altavoz Bluetooth', categoria: 'Electrónicos', precio: 79.99, stock: 0, imagen: '🔊' },
];

// Hook personalizado para gestionar productos
export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>(productosData);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Filtrar productos
  const productosFiltrados = productos.filter(producto => {
    // Filtro por categoría
    if (filtroCategoria && producto.categoria !== filtroCategoria) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda && !producto.nombre.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Ordenar productos
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (ordenarPor === 'precio-asc') {
      return a.precio - b.precio;
    } else if (ordenarPor === 'precio-desc') {
      return b.precio - a.precio;
    } else if (ordenarPor === 'nombre') {
      return a.nombre.localeCompare(b.nombre);
    } else if (ordenarPor === 'stock') {
      return b.stock - a.stock;
    }
    return 0;
  });

  // Añadir producto
  const añadirProducto = (nuevoProducto: Omit<Producto, 'id'>) => {
    setProductos([...productos, { ...nuevoProducto, id: `P${String(productos.length + 1).padStart(3, '0')}` }]);
  };

  // Actualizar producto
  const actualizarProducto = (id: string, datosActualizados: Partial<Producto>) => {
    setProductos(productos.map(producto =>
      producto.id === id ? { ...producto, ...datosActualizados } : producto
    ));
  };

  // Eliminar producto
  const eliminarProducto = (id: string) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  // Estadísticas de productos
  const estadisticasProductos = {
    total: productos.length,
    agotados: productos.filter(p => p.stock === 0).length,
    valorInventario: productos.reduce((total, p) => total + (p.precio * p.stock), 0).toFixed(2),
    categorias: [...new Set(productos.map(p => p.categoria))],
  };

  return {
    productos: productosOrdenados,
    estadisticasProductos,
    setFiltroCategoria,
    setOrdenarPor,
    setBusqueda,
    añadirProducto,
    actualizarProducto,
    eliminarProducto,
  };
};

// Datos de ejemplo para la funcionalidad de pedidos
const pedidosData: Pedido[] = [
  { id: '#1234', cliente: 'Juan Pérez', fecha: '08/04/2025', total: 120.50, estado: 'Completado', productos: ['P001', 'P003'] },
  { id: '#1235', cliente: 'María López', fecha: '07/04/2025', total: 85.20, estado: 'Pendiente', productos: ['P004'] },
  { id: '#1236', cliente: 'Carlos Ruiz', fecha: '07/04/2025', total: 210.75, estado: 'Procesando', productos: ['P002'] },
  { id: '#1237', cliente: 'Ana Gómez', fecha: '06/04/2025', total: 45.00, estado: 'Completado', productos: ['P003'] },
  { id: '#1238', cliente: 'Pedro Sánchez', fecha: '05/04/2025', total: 320.30, estado: 'Cancelado', productos: ['P002', 'P006'] },
  { id: '#1239', cliente: 'Laura Martínez', fecha: '05/04/2025', total: 95.60, estado: 'Completado', productos: ['P004', 'P003'] },
  { id: '#1240', cliente: 'Roberto Fernández', fecha: '04/04/2025', total: 150.25, estado: 'Enviado', productos: ['P007'] },
  { id: '#1241', cliente: 'Carmen Díaz', fecha: '04/04/2025', total: 78.90, estado: 'Procesando', productos: ['P003'] },
  { id: '#1242', cliente: 'Javier Moreno', fecha: '03/04/2025', total: 220.40, estado: 'Completado', productos: ['P005', 'P004'] },
  { id: '#1243', cliente: 'Sofía Álvarez', fecha: '03/04/2025', total: 65.75, estado: 'Pendiente', productos: ['P004'] },
];

// Hook personalizado para gestionar pedidos
export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosData);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(pedido => {
    // Filtro por estado
    if (filtroEstado && pedido.estado !== filtroEstado) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda && !pedido.cliente.toLowerCase().includes(busqueda.toLowerCase()) && !pedido.id.includes(busqueda)) {
      return false;
    }

    return true;
  });

  // Ordenar pedidos
  const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => {
    if (ordenarPor === 'fecha-asc') {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    } else if (ordenarPor === 'fecha-desc') {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    } else if (ordenarPor === 'total-asc') {
      return a.total - b.total;
    } else if (ordenarPor === 'total-desc') {
      return b.total - a.total;
    }
    return 0;
  });

  // Añadir pedido
  const añadirPedido = (nuevoPedido: Omit<Pedido, 'id'>) => {
    setPedidos([...pedidos, { ...nuevoPedido, id: `#${String(1243 + pedidos.length - 9)}` }]);
  };

  // Actualizar estado de pedido
  const actualizarEstadoPedido = (id: string, nuevoEstado: string) => {
    setPedidos(pedidos.map(pedido =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    ));
  };

  // Estadísticas de pedidos
  const estadisticasPedidos = {
    total: pedidos.length,
    completados: pedidos.filter(p => p.estado === 'Completado').length,
    pendientes: pedidos.filter(p => p.estado === 'Pendiente').length,
    procesando: pedidos.filter(p => p.estado === 'Procesando').length,
    enviados: pedidos.filter(p => p.estado === 'Enviado').length,
    cancelados: pedidos.filter(p => p.estado === 'Cancelado').length,
    totalVentas: pedidos.reduce((total, p) => total + p.total, 0).toFixed(2),
  };

  return {
    pedidos: pedidosOrdenados,
    estadisticasPedidos,
    setFiltroEstado,
    setOrdenarPor,
    setBusqueda,
    añadirPedido,
    actualizarEstadoPedido,
  };
};

// Datos de ejemplo para la funcionalidad de clientes
const clientesData: Cliente[] = [
  { id: 'C001', nombre: 'Juan Pérez', email: 'juan.perez@example.com', pedidos: 8, gastado: 950.75, estado: 'Activo' },
  { id: 'C002', nombre: 'María López', email: 'maria.lopez@example.com', pedidos: 5, gastado: 420.30, estado: 'Activo' },
  { id: 'C003', nombre: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', pedidos: 12, gastado: 1250.60, estado: 'Activo' },
  { id: 'C004', nombre: 'Ana Gómez', email: 'ana.gomez@example.com', pedidos: 3, gastado: 180.25, estado: 'Inactivo' },
  { id: 'C005', nombre: 'Pedro Sánchez', email: 'pedro.sanchez@example.com', pedidos: 7, gastado: 780.90, estado: 'Activo' },
  { id: 'C006', nombre: 'Laura Martínez', email: 'laura.martinez@example.com', pedidos: 4, gastado: 320.45, estado: 'Activo' },
  { id: 'C007', nombre: 'Roberto Fernández', email: 'roberto.fernandez@example.com', pedidos: 2, gastado: 150.20, estado: 'Inactivo' },
  { id: 'C008', nombre: 'Carmen Díaz', email: 'carmen.diaz@example.com', pedidos: 6, gastado: 520.80, estado: 'Activo' },
  { id: 'C009', nombre: 'Javier Moreno', email: 'javier.moreno@example.com', pedidos: 9, gastado: 870.35, estado: 'Activo' },
  { id: 'C010', nombre: 'Sofía Álvarez', email: 'sofia.alvarez@example.com', pedidos: 1, gastado: 75.50, estado: 'Inactivo' },
];

// Hook personalizado para gestionar clientes
export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(clientesData);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    // Filtro por estado
    if (filtroEstado && cliente.estado !== filtroEstado) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda && !cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) && !cliente.email.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Ordenar clientes
  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    if (ordenarPor === 'nombre') {
      return a.nombre.localeCompare(b.nombre);
    } else if (ordenarPor === 'pedidos-desc') {
      return b.pedidos - a.pedidos;
    } else if (ordenarPor === 'gastado-desc') {
      return b.gastado - a.gastado;
    }
    return 0;
  });

  // Añadir cliente
  const añadirCliente = (nuevoCliente: Omit<Cliente, 'id'>) => {
    setClientes([...clientes, { ...nuevoCliente, id: `C${String(clientes.length + 1).padStart(3, '0')}` }]);
  };

  // Actualizar cliente
  const actualizarCliente = (id: string, datosActualizados: Partial<Cliente>) => {
    setClientes(clientes.map(cliente =>
      cliente.id === id ? { ...cliente, ...datosActualizados } : cliente
    ));
  };

  // Estadísticas de clientes
  const estadisticasClientes = {
    total: clientes.length,
    activos: clientes.filter(c => c.estado === 'Activo').length,
    inactivos: clientes.filter(c => c.estado === 'Inactivo').length,
    totalGastado: clientes.reduce((total, c) => total + c.gastado, 0).toFixed(2),
    promedioGastado: (clientes.reduce((total, c) => total + c.gastado, 0) / clientes.length).toFixed(2),
    clientesFrequentes: clientes.filter(c => c.pedidos > 5).length,
  };

  return {
    clientes: clientesOrdenados,
    estadisticasClientes,
    setFiltroEstado,
    setOrdenarPor,
    setBusqueda,
    añadirCliente,
    actualizarCliente,
  };
};
