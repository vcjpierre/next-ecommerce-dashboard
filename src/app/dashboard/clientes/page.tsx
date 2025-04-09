"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Table from '@/components/ui/Table';
import StatCard from '@/components/ui/StatCard';
import Chart from '@/components/ui/Chart';
import { useClientes } from '@/lib/hooks';

export default function ClientesPage() {
  const {
    clientes,
    estadisticasClientes,
    setFiltroEstado,
    setOrdenarPor,
    setBusqueda
  } = useClientes();

  const [busquedaTexto, setBusquedaTexto] = React.useState('');

  const handleBusqueda = (e: React.FormEvent) => {
    e.preventDefault();
    setBusqueda(busquedaTexto);
  };

  const clientesTablaData = clientes.map(cliente => ({
    id: cliente.id,
    nombre: cliente.nombre,
    email: cliente.email,
    pedidos: cliente.pedidos.toString(),
    gastado: `$${cliente.gastado.toFixed(2)}`,
    estado: cliente.estado
  }));

  const clientesPorMesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    values: [25, 30, 28, 35, 42, 48],
  };

  return (
    <DashboardLayout title="Clientes">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Clientes"
          value={estadisticasClientes.total.toString()}
          icon="👥"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Clientes Activos"
          value={estadisticasClientes.activos.toString()}
          icon="✅"
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Clientes Frecuentes"
          value={estadisticasClientes.clientesFrequentes.toString()}
          icon="🔄"
        />
        <StatCard
          title="Valor Promedio"
          value={`$${estadisticasClientes.promedioGastado}`}
          icon="💰"
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Chart
            title="Nuevos Clientes por Mes"
            data={clientesPorMesData}
            type="line"
            height={300}
          />
        </div>
        <div>
          <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 h-full">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Segmentación de Clientes</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Clientes Frecuentes</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasClientes.clientesFrequentes / estadisticasClientes.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasClientes.clientesFrequentes / estadisticasClientes.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Clientes Ocasionales</span>
                  <span className="text-sm font-medium">
                    {Math.round(((estadisticasClientes.activos - estadisticasClientes.clientesFrequentes) / estadisticasClientes.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-secondary-500 h-2 rounded-full"
                    style={{ width: `${((estadisticasClientes.activos - estadisticasClientes.clientesFrequentes) / estadisticasClientes.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Clientes Inactivos</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasClientes.inactivos / estadisticasClientes.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasClientes.inactivos / estadisticasClientes.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Lista de Clientes</h3>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <form onSubmit={handleBusqueda} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar clientes..."
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
              onChange={(e) => setFiltroEstado(e.target.value)}
              defaultValue=""
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              onChange={(e) => setOrdenarPor(e.target.value)}
              defaultValue=""
            >
              <option value="">Ordenar por</option>
              <option value="nombre">Nombre</option>
              <option value="pedidos-desc">Pedidos (mayor a menor)</option>
              <option value="gastado-desc">Gastado (mayor a menor)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              Añadir Cliente
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Exportar
            </button>
          </div>
        </div>
        <Table
          headers={['ID', 'Nombre', 'Email', 'Pedidos', 'Gastado', 'Estado']}
          data={clientesTablaData}
        />
      </div>
    </DashboardLayout>
  );
}
