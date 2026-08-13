'use client';

import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  user?: any;
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notificações */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Perfil */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <p className="text-xs text-gray-500">Premium</p>
          </div>
          <button className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
