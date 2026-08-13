'use client';

import { useState } from 'react';
import { Plus, Eye, EyeOff, Copy, Trash2 } from 'lucide-react';

export default function LoginsPage() {
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [logins] = useState([
    { id: 1, site: 'Banco do Brasil', usuario: 'seu@email.com', categoria: 'Banco', criado: '01/08/2025' },
    { id: 2, site: 'Nubank', usuario: 'seu@email.com', categoria: 'Banco', criado: '05/08/2025' },
    { id: 3, site: 'Instagram', usuario: '@seu_usuario', categoria: 'Redes Sociais', criado: '10/08/2025' },
  ]);

  const togglePassword = (id: number) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Logins e Senhas</h1>
          <p className="text-gray-600 mt-1">Mantenha seus acessos organizados e seguros</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition">
          <Plus className="w-5 h-5" />
          Novo Login
        </button>
      </div>

      {/* Aviso de Segurança */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          🔒 Suas senhas são criptografadas e seguras. Recomendamos usar senhas fortes e únicas para cada serviço.
        </p>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Site/Serviço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Usuário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Senha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logins.map((login) => (
              <tr key={login.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{login.site}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{login.usuario}</td>
                <td className="px-6 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {showPasswords[login.id] ? '••••••••' : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePassword(login.id)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      {showPasswords[login.id] ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                    {login.categoria}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm flex items-center gap-2">
                  <button className="p-1 hover:bg-blue-50 rounded transition" title="Copiar">
                    <Copy className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-1 hover:bg-red-50 rounded transition" title="Deletar">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
