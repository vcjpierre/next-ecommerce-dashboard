"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Table from '@/components/ui/Table';
import StatCard from '@/components/ui/StatCard';
import Chart from '@/components/ui/Chart';
import { useProductos } from '@/lib/hooks';

export default function ProductosPage() {
  const {
    productos,
    estadisticasProductos,
    setFiltroCategoria,
    setOrdenarPor,
    setBusqueda
  } = useProductos();

  const [busquedaTexto, setBusquedaTexto] = React.useState('');

  const handleBusqueda = (e: React.FormEvent) => {
    e.preventDefault();
    setBusqueda(busquedaTexto);
  };

  const productosTablaData = productos.map(producto => ({
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: `$${producto.precio.toFixed(2)}`,
    stock: producto.stock.toString(),
    estado: producto.stock > 0 ? 'Disponible' : 'Agotado'
  }));

  // Eliminar el manejador de eventos para la compilación estática
  const handleRowClick = React.useCallback(() => {
    // Esta función se ejecutará en el cliente
    console.log('Clicked product');
  }, []);

  return (
    <DashboardLayout title="Productos">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Productos"
          value={estadisticasProductos.total.toString()}
          icon="📦"
        />
        <StatCard
          title="Productos Agotados"
          value={estadisticasProductos.agotados.toString()}
          icon="⚠️"
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Valor de Inventario"
          value={`$${estadisticasProductos.valorInventario}`}
          icon="💰"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Lista de Productos</h3>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <form onSubmit={handleBusqueda} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={busquedaTexto}
                onChange={(e) => setBusquedaTexto(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Buscar
              </button>
            </form>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              onChange={(e) => setFiltroCategoria(e.target.value)}
              defaultValue=""
            >
              <option value="">Todas las categorías</option>
              {estadisticasProductos.categorias.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              onChange={(e) => setOrdenarPor(e.target.value)}
              defaultValue=""
            >
              <option value="">Ordenar por</option>
              <option value="nombre">Nombre</option>
              <option value="precio-asc">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
              <option value="stock">Stock</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              Añadir Producto
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Exportar
            </button>
          </div>
        </div>
        <Table
          headers={['ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Estado']}
          data={productosTablaData}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Productos Destacados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productos.slice(0, 4).map((producto) => (
            <div
              key={producto.id}
              className="bg-white dark:bg-gray-900 rounded-card shadow-card hover:shadow-card-hover transition-all cursor-pointer"
              onClick={handleRowClick}
            >
              <div className="relative h-48 rounded-t-card overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">{producto.imagen}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{producto.nombre}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{producto.categoria}</p>
                  </div>
                  <span className="font-bold text-primary-600 dark:text-primary-400">${producto.precio.toFixed(2)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-sm font-medium ${producto.stock > 10
                      ? 'text-green-600 dark:text-green-400'
                      : producto.stock > 0
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                    {producto.stock > 10
                      ? 'En stock'
                      : producto.stock > 0
                        ? `Solo ${producto.stock} restantes`
                        : 'Agotado'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">ID: {producto.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
