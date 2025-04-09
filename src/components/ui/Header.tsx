import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Título con margen a la izquierda en dispositivos móviles para evitar solapamiento con el botón del sidebar */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white ml-10 md:ml-0 truncate">{title}</h1>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="text-xl">🔔</span>
          </button>

          <Link href="/dashboard/ajustes" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-xl">⚙️</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
