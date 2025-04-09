"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Table from '@/components/ui/Table';
import StatCard from '@/components/ui/StatCard';
import Chart from '@/components/ui/Chart';
import { usePedidos } from '@/lib/hooks';

export default function PedidosPage() {
  const {
    pedidos,
    estadisticasPedidos,
    setFiltroEstado,
    setOrdenarPor,
    setBusqueda
  } = usePedidos();

  const [busquedaTexto, setBusquedaTexto] = React.useState('');

  const handleBusqueda = (e: React.FormEvent) => {
    e.preventDefault();
    setBusqueda(busquedaTexto);
  };

  const pedidosTablaData = pedidos.map(pedido => ({
    id: pedido.id,
    cliente: pedido.cliente,
    fecha: pedido.fecha,
    total: `$${pedido.total.toFixed(2)}`,
    estado: pedido.estado
  }));

  const ventasPorDiaData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    values: [1200, 1800, 1400, 2200, 1900, 2500, 1700],
  };

  return (
    <DashboardLayout title="Pedidos">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Pedidos"
          value={estadisticasPedidos.total.toString()}
          icon="🛒"
          trend={{ value: 8.5, isPositive: true }}
        />
        <StatCard
          title="Pendientes"
          value={estadisticasPedidos.pendientes.toString()}
          icon="⏳"
        />
        <StatCard
          title="Completados"
          value={estadisticasPedidos.completados.toString()}
          icon="✅"
        />
        <StatCard
          title="Cancelados"
          value={estadisticasPedidos.cancelados.toString()}
          icon="❌"
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Chart
            title="Ventas por Día (Última Semana)"
            data={ventasPorDiaData}
            type="bar"
            height={300}
          />
        </div>
        <div>
          <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 h-full">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Estado de Pedidos</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Completados</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasPedidos.completados / estadisticasPedidos.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasPedidos.completados / estadisticasPedidos.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pendientes</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasPedidos.pendientes / estadisticasPedidos.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasPedidos.pendientes / estadisticasPedidos.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Procesando</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasPedidos.procesando / estadisticasPedidos.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasPedidos.procesando / estadisticasPedidos.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Enviados</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasPedidos.enviados / estadisticasPedidos.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasPedidos.enviados / estadisticasPedidos.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Cancelados</span>
                  <span className="text-sm font-medium">
                    {Math.round((estadisticasPedidos.cancelados / estadisticasPedidos.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(estadisticasPedidos.cancelados / estadisticasPedidos.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Lista de Pedidos</h3>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <form onSubmit={handleBusqueda} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar pedidos..."
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
              <option value="Pendiente">Pendiente</option>
              <option value="Procesando">Procesando</option>
              <option value="Enviado">Enviado</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              onChange={(e) => setOrdenarPor(e.target.value)}
              defaultValue=""
            >
              <option value="">Ordenar por</option>
              <option value="fecha-desc">Fecha (más reciente)</option>
              <option value="fecha-asc">Fecha (más antigua)</option>
              <option value="total-desc">Total (mayor a menor)</option>
              <option value="total-asc">Total (menor a mayor)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              Nuevo Pedido
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Exportar
            </button>
          </div>
        </div>
        <Table
          headers={['ID', 'Cliente', 'Fecha', 'Total', 'Estado']}
          data={pedidosTablaData}
        />
      </div>
    </DashboardLayout>
  );
}
