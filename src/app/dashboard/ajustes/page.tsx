"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirigir si no hay usuario autenticado
  React.useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null; // No renderizar nada mientras se verifica la autenticación
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <DashboardLayout title="Ajustes">
      <div className="space-y-6">
        {/* Sección de perfil */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Perfil de Usuario</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-gray-500 dark:text-gray-400">{user.name.charAt(0)}</span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Rol: <span className="font-medium text-primary-600 dark:text-primary-400">{user.role}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Sección de seguridad */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Seguridad</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña actual
              </label>
              <input
                type="password"
                id="current-password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
              Cambiar contraseña
            </button>
          </div>
        </div>

        {/* Sección de preferencias */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferencias</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Modo oscuro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Activar el modo oscuro para la interfaz</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="toggle-dark-mode"
                  className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-gray-300 dark:border-gray-700 checked:right-0 checked:border-primary-600 right-6 checked:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                />
                <label
                  htmlFor="toggle-dark-mode"
                  className="block h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 dark:bg-gray-700 peer-checked:bg-primary-200 dark:peer-checked:bg-primary-900"
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones por email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recibir notificaciones por correo electrónico</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="toggle-email-notifications"
                  className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-gray-300 dark:border-gray-700 checked:right-0 checked:border-primary-600 right-6 checked:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  defaultChecked
                />
                <label
                  htmlFor="toggle-email-notifications"
                  className="block h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 dark:bg-gray-700 peer-checked:bg-primary-200 dark:peer-checked:bg-primary-900"
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones push</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recibir notificaciones push en el navegador</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="toggle-push-notifications"
                  className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-gray-300 dark:border-gray-700 checked:right-0 checked:border-primary-600 right-6 checked:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  defaultChecked
                />
                <label
                  htmlFor="toggle-push-notifications"
                  className="block h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 dark:bg-gray-700 peer-checked:bg-primary-200 dark:peer-checked:bg-primary-900"
                ></label>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de sesión */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sesión</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dispositivos conectados</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona los dispositivos donde has iniciado sesión</p>
              <button className="mt-2 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Ver dispositivos
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Cerrar sesión en todos los dispositivos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cierra la sesión en todos los dispositivos donde hayas iniciado sesión</p>
              <button className="mt-2 text-sm text-red-600 hover:text-red-500 dark:text-red-400">
                Cerrar todas las sesiones
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
