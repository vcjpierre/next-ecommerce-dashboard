"use client";

import React from 'react';
import Link from 'next/link';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void; // Nueva prop para manejar clics
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label, active = false, onClick }) => {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                 ${active 
                   ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                   : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default SidebarLink;
