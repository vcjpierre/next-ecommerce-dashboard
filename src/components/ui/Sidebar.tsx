import React, { useState, useEffect } from 'react';
import SidebarLink from './SidebarLink';

// Iconos simulados - en un proyecto real usaríamos una biblioteca de iconos
const HomeIcon = () => <div>🏠</div>;
const ProductsIcon = () => <div>📦</div>;
const OrdersIcon = () => <div>🛒</div>;
const CustomersIcon = () => <div>👥</div>;
const StatsIcon = () => <div>📊</div>;
const SettingsIcon = () => <div>⚙️</div>;
const MenuIcon = () => <div className="text-xl">☰</div>;
const CloseIcon = () => <div className="text-xl">✕</div>;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Comprobar inicialmente
    checkIfMobile();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkIfMobile);
    
    // Limpiar listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Cerrar el menú cuando se hace clic fuera en dispositivos móviles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');
      
      if (sidebar && 
          !sidebar.contains(event.target as Node) && 
          toggleButton && 
          !toggleButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  // Toggle para abrir/cerrar el sidebar en móviles
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón para móvil que muestra/oculta el sidebar */}
      {isMobile && (
        <button 
          id="sidebar-toggle"
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          style={{ top: '1rem', left: '1rem', zIndex: 60 }} // Asegurar que el botón esté por encima del contenido
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      )}

      {/* Overlay para móvil cuando el menú está abierto */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`${isMobile ? 'fixed left-0 top-0 z-40' : 'relative'} 
                   ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} 
                   w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 
                   dark:border-gray-800 flex flex-col transition-transform duration-300 ease-in-out`}
        style={{ paddingTop: '4rem' }} // Ajustar padding para evitar cruce con el botón
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Dashboard
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarLink href="/dashboard" icon={<HomeIcon />} label="Inicio" onClick={() => isMobile && setIsOpen(false)} />
          <SidebarLink href="/dashboard/productos" icon={<ProductsIcon />} label="Productos" onClick={() => isMobile && setIsOpen(false)} />
          <SidebarLink href="/dashboard/pedidos" icon={<OrdersIcon />} label="Pedidos" onClick={() => isMobile && setIsOpen(false)} />
          <SidebarLink href="/dashboard/clientes" icon={<CustomersIcon />} label="Clientes" onClick={() => isMobile && setIsOpen(false)} />
          <SidebarLink href="/dashboard/estadisticas" icon={<StatsIcon />} label="Estadísticas" onClick={() => isMobile && setIsOpen(false)} />
          <SidebarLink href="/dashboard/ajustes" icon={<SettingsIcon />} label="Ajustes" onClick={() => isMobile && setIsOpen(false)} />
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
    </>
  );
};

export default Sidebar;
