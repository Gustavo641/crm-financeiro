'use client';

import { useState } from 'react';
import { Bell, Lock, Trash2, Save, User, Sliders } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [tema, setTema] = useState('dark');
  const [notificacoes, setNotificacoes] = useState(true);
  const [privacidade, setPrivacidade] = useState('private');
  const [moeda, setMoeda] = useState('BRL');
  const [idioma, setIdioma] = useState('pt-BR');
  const [email, setEmail] = useState('teste@email.com');
  const [nome, setNome] = useState('teste');
  const [notificacoesSalvas, setNotificacoesSalvas] = useState(false);

  const handleSave = () => {
    setNotificacoesSalvas(true);
    setTimeout(() => setNotificacoesSalvas(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">⚙️ Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie suas preferências e conta pessoal</p>
      </div>

      {/* Mensagem de Sucesso */}
      {notificacoesSalvas && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          ✓ Configurações salvas com sucesso!
        </div>
      )}

      {/* Perfil */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white">
            👤
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{nome}</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition">
            Editar Foto
          </button>
        </div>
      </div>

      {/* Preferências */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-lg text-gray-900">Preferências</h2>
        </div>
        <div className="space-y-6">
          {/* Notificações */}
          <div className="pb-6 border-b border-gray-200">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Notificações Push</p>
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

          {/* Tema */}
          <div className="pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Tema Visual</label>
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="light">☀️ Tema Claro</option>
              <option value="dark">🌙 Tema Escuro</option>
              <option value="auto">🔄 Automático</option>
            </select>
          </div>

          {/* Moeda */}
          <div className="pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Moeda Padrão</label>
            <select
              value={moeda}
              onChange={(e) => setMoeda(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="BRL">💵 Real (R$)</option>
              <option value="USD">💱 Dólar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
            </select>
          </div>

          {/* Idioma */}
          <div className="pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Idioma</label>
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="pt-BR">🇧🇷 Português (Brasil)</option>
              <option value="en-US">🇺🇸 English (USA)</option>
              <option value="es-ES">🇪🇸 Español (España)</option>
            </select>
          </div>

          {/* Privacidade */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Privacidade</label>
            <select
              value={privacidade}
              onChange={(e) => setPrivacidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="public">🌍 Público</option>
              <option value="private">🔒 Privado</option>
            </select>
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
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            🔐 Alterar Senha
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            📱 Autenticação em 2 Fatores
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            🔑 Gerenciar Sessões
          </button>
        </div>
      </div>

      {/* Dados e Privacidade */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-lg text-gray-900">Dados e Privacidade</h2>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            📥 Fazer backup dos dados
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-medium text-gray-900">
            📋 Solicitar dados pessoais
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition font-medium text-red-700">
            ⚠️ Deletar minha conta
          </button>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
        >
          <Save className="w-5 h-5" />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
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
