"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AjustesPage() {
  const [formState, setFormState] = useState({
    nombre: 'Admin User',
    email: 'admin@example.com',
    notificaciones: true,
    temaOscuro: false,
    idioma: 'es'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormState({
      ...formState,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los ajustes
    alert('Configuración guardada');
  };

  return (
    <DashboardLayout title="Ajustes">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Configuración de la cuenta</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Sección de perfil */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Perfil</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formState.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            
            {/* Sección de preferencias */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Preferencias</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="idioma" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Idioma
                  </label>
                  <select
                    id="idioma"
                    name="idioma"
                    value={formState.idioma}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 
                              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="temaOscuro"
                    name="temaOscuro"
                    checked={formState.temaOscuro}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="temaOscuro" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Activar tema oscuro
                  </label>
                </div>
              </div>
            </div>
            
            {/* Sección de notificaciones */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Notificaciones</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notificaciones"
                  name="notificaciones"
                  checked={formState.notificaciones}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notificaciones" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Recibir notificaciones por correo
                </label>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent 
                          rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
