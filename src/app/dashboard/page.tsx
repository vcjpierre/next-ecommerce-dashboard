"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Chart from '@/components/ui/Chart';
import { usePedidos, useClientes, useProductos } from '@/lib/hooks';

export default function DashboardHomePage() {
  const { estadisticasPedidos, pedidos } = usePedidos();
  const { estadisticasClientes } = useClientes();
  const { estadisticasProductos } = useProductos();

  const ventasMensualesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    values: [1200, 1900, 3000, 5000, 2300, 3200, 4500, 2800, 3700, 4100, 5200, 6000],
  };

  const pedidosStatusData = {
    labels: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
    values: [
      pedidos.filter(p => p.estado === 'Pendiente').length,
      pedidos.filter(p => p.estado === 'Procesando').length,
      pedidos.filter(p => p.estado === 'Enviado').length,
      pedidos.filter(p => p.estado === 'Entregado').length,
      pedidos.filter(p => p.estado === 'Cancelado').length,
    ],
  };

  const pedidosRecientes = pedidos.slice(0, 5).map(pedido => ({
    id: pedido.id,
    cliente: pedido.cliente || 'N/A',
    fecha: pedido.fecha,
    total: `$${pedido.total.toFixed(2)}`,
    estado: pedido.estado,
  }));

  return (
    <DashboardLayout title="Resumen General">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Ingresos Totales"
          value={`$${estadisticasPedidos.totalVentas}`}
          icon="💵"
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatCard
          title="Pedidos Totales"
          value={estadisticasPedidos.total.toString()}
          icon="🛒"
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard
          title="Clientes Activos"
          value={estadisticasClientes.activos.toString()}
          icon="🧑‍🤝‍🧑"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Productos Activos"
          value={estadisticasProductos.total.toString()}
          icon="📦"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ventas Mensuales</h3>
          <Chart
            title=""
            data={ventasMensualesData}
            type="line"
            height={300}
          />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Distribución de Pedidos</h3>
          <Chart
            title=""
            data={pedidosStatusData}
            type="bar"
            height={300}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pedidos Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID Pedido</th>
                <th scope="col" className="px-6 py-3">Cliente</th>
                <th scope="col" className="px-6 py-3">Fecha</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidosRecientes.map((pedido) => (
                <tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pedido.id}</td>
                  <td className="px-6 py-4">{pedido.cliente}</td>
                  <td className="px-6 py-4">{pedido.fecha}</td>
                  <td className="px-6 py-4">{pedido.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        pedido.estado === 'Enviado' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          pedido.estado === 'Procesando' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            pedido.estado === 'Pendiente' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                      {pedido.estado}
                    </span>
                  </td>
                </tr>
              ))}
              {pedidosRecientes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">No hay pedidos recientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </DashboardLayout>
  );
}