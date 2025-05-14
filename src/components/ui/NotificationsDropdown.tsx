
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Pedido Completado',
    message: 'Tu pedido #12345 ha sido enviado.',
    time: 'Hace 5 minutos',
    read: false,
  },
  {
    id: '2',
    type: 'error',
    title: 'Error de Pago',
    message: 'No se pudo procesar el pago para el pedido #12340.',
    time: 'Hace 1 hora',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Nuevo Producto Añadido',
    message: 'Se ha añadido un nuevo producto a la categoría Electrónicos.',
    time: 'Hace 3 horas',
    read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Bajo Stock',
    message: 'El producto "Laptop Pro" tiene bajo stock.',
    time: 'Ayer',
    read: false,
  },
  {
    id: '5',
    type: 'info',
    title: 'Mantenimiento Programado',
    message: 'Habrá un mantenimiento programado el día de mañana a las 02:00 AM.',
    time: 'Ayer',
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'error':
      return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
    case 'info':
      return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
    default:
      return <BellIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary-500"
      >
        <span className="sr-only">Ver notificaciones</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-50">
          <div className="py-1">
            <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">No hay notificaciones nuevas.</p>
              ) : (
                notifications.map((notification) => (
                  <a
                    key={notification.id}
                    href="#" // En una aplicación real, esto podría llevar a la página relevante
                    onClick={() => markAsRead(notification.id)}
                    className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${!notification.read ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <NotificationIcon type={notification.type} />
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className={`text-sm font-medium text-gray-900 dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="ml-2 flex-shrink-0 pt-0.5">
                          <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                        </div>
                      )}
                    </div>
                  </a>
                ))
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#" // Enlace a una página de todas las notificaciones
                className="block text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                Ver todas las notificaciones
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}