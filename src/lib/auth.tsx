"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir la interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Definir la interfaz para el usuario
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulación de una llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificar credenciales (en un caso real, esto se haría en el backend)
        if (email && password) {
          // Usuario de ejemplo
          const mockUser: User = {
            id: '1',
            name: 'Administrador',
            email: email,
            role: 'admin',
            avatar: '/avatar.png'
          };

          // Guardar usuario en el estado
          setUser(mockUser);

          // Guardar en localStorage para persistencia
          localStorage.setItem('user', JSON.stringify(mockUser));

          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Verificar si hay un usuario guardado en localStorage al cargar
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Proporcionar el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
