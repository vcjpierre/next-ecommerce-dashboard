
"use client";

import React from 'react';
import Link from 'next/link';
import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import NotificationsDropdown from './NotificationsDropdown'; // Asumiendo que está en el mismo directorio o ajustar ruta
import { useAuth } from '@/lib/auth'; // Para obtener información del usuario si es necesario

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth(); // Opcional: para mostrar avatar o nombre de usuario

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>

        <div className="flex items-center gap-4">
          {/* Menú desplegable de Notificaciones */}
          <NotificationsDropdown />

          {/* Enlace a la Página de Ajustes */}
          <Link href="/dashboard/ajustes" legacyBehavior>
            <a className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary-500">
              <span className="sr-only">Ver ajustes</span>
              <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
            </a>
          </Link>

          {/* Opcional: Avatar del usuario o enlace a perfil */}
          {user && (
            <Link href="/dashboard/ajustes" legacyBehavior>
              <a className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary-500">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.name}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                )}
                {/* <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span> */}
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;