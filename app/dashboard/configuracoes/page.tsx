'use client';

import { useState } from 'react';
import { Bell, Lock, Trash2, Save } from 'lucide-react';

export default function Configuracoes() {
  const [tema, setTema] = useState('light');
  const [notificacoes, setNotificacoes] = useState(true);
  const [privacidade, setPrivacidade] = useState('public');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie suas preferências e conta</p>
      </div>

      {/* Perfil */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white">
            👤
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">João Silva</h3>
            <p className="text-gray-600">joao@email.com</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition">
          Editar Perfil
        </button>
      </div>

      {/* Preferências */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-lg text-gray-900 mb-6">Preferências</h2>
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Notificações</p>
                  <p className="text-sm text-gray-600">Receber alertas de contas vencidas e metas</p>
                </div>
              </div>
              <button
                onClick={() => setNotificacoes(!notificacoes)}
                className={`w-12 h-6 rounded-full transition ${notificacoes ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition ${notificacoes ? 'ml-6' : 'ml-0.5'}`} />
              </button>
            </label>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="flex items-center gap-3">
              <select
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="light">☀️ Tema Claro</option>
                <option value="dark">🌙 Tema Escuro</option>
                <option value="auto">🔄 Automático</option>
              </select>
            </label>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="flex items-center gap-3">
              <select
                value={privacidade}
                onChange={(e) => setPrivacidade(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="public">🌍 Público</option>
                <option value="private">🔒 Privado</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-lg text-gray-900">Segurança</h2>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            🔐 Alterar Senha
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            📱 Autenticação em 2 Fatores
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            🔑 Gerenciar Sessões
          </button>
        </div>
      </div>

      {/* Ações Perigosas */}
      <div className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h2 className="font-semibold text-lg text-gray-900">Zona Perigosa</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Essas ações são irreversíveis. Tenha cuidado ao proceder.
        </p>
        <button className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
          Deletar Conta
        </button>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2.5 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition">
          Cancelar
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition">
          <Save className="w-5 h-5" />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
