import React from 'react';
import SidebarLink from './SidebarLink';

// Iconos simulados - en un proyecto real usaríamos una biblioteca de iconos
const HomeIcon = () => <div>🏠</div>;
const ProductsIcon = () => <div>📦</div>;
const OrdersIcon = () => <div>🛒</div>;
const CustomersIcon = () => <div>👥</div>;
const StatsIcon = () => <div>📊</div>;

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
          Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarLink href="/dashboard" icon={<HomeIcon />} label="Inicio" />
        <SidebarLink href="/dashboard/productos" icon={<ProductsIcon />} label="Productos" />
        <SidebarLink href="/dashboard/pedidos" icon={<OrdersIcon />} label="Pedidos" />
        <SidebarLink href="/dashboard/clientes" icon={<CustomersIcon />} label="Clientes" />
        <SidebarLink href="/dashboard/estadisticas" icon={<StatsIcon />} label="Estadísticas" />
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-300">
            👤
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
