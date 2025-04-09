"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Chart from '@/components/ui/Chart';
import StatCard from '@/components/ui/StatCard';
import { useProductos, usePedidos, useClientes } from '@/lib/hooks';

export default function EstadisticasPage() {
  const { estadisticasProductos } = useProductos();
  const { estadisticasPedidos } = usePedidos();
  const { estadisticasClientes } = useClientes();

  // Datos para gráficos
  const ventasPorMesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    values: [15000, 18000, 16500, 21000, 22500, 25000],
  };

  // Calcular porcentajes para categorías
  const categorias = estadisticasProductos.categorias;
  const ventasPorCategoriaData = {
    labels: categorias,
    values: categorias.map((_, index) => {
      // Valores simulados para cada categoría
      const porcentajes = [35, 25, 20, 12, 8];
      return porcentajes[index] || Math.floor(Math.random() * 20);
    }),
  };

  const clientesPorEdadData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    values: [15, 32, 28, 18, 7],
  };

  return (
    <DashboardLayout title="Estadísticas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Ventas Totales"
          value={`$${estadisticasPedidos.totalVentas}`}
          icon="💰"
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatCard
          title="Ticket Promedio"
          value={`$${(Number(estadisticasPedidos.totalVentas) / estadisticasPedidos.total).toFixed(2)}`}
          icon="🧾"
          trend={{ value: 3.8, isPositive: true }}
        />
        <StatCard
          title="Tasa de Conversión"
          value="3.2%"
          icon="📈"
          trend={{ value: 0.5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
          <Chart
            title="Ventas Mensuales"
            data={ventasPorMesData}
            type="bar"
            height={300}
          />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Ventas por Categoría</h3>
          <div className="space-y-4">
            {categorias.map((categoria, index) => {
              const porcentaje = ventasPorCategoriaData.values[index];
              const colores = ['bg-primary-500', 'bg-secondary-500', 'bg-accent-500', 'bg-green-500', 'bg-purple-500'];

              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{categoria}</span>
                    <span className="text-sm font-medium">{porcentaje}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${colores[index % colores.length]} h-2 rounded-full`}
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Métodos de Pago</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tarjeta de Crédito</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">PayPal</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Transferencia Bancaria</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Otros</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Clientes por Edad</h3>
          <Chart
            title=""
            data={clientesPorEdadData}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
