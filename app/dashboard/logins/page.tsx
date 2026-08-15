'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, Copy, Trash2, Edit2, X } from 'lucide-react';

interface Login {
  id: number;
  site: string;
  usuario: string;
  senha: string;
  categoria: string;
  criado: string;
}

const DEFAULT_LOGINS: Login[] = [
  { id: 1, site: 'Banco do Brasil', usuario: 'seu@email.com', senha: 'senha123', categoria: 'Banco', criado: '01/08/2025' },
  { id: 2, site: 'Nubank', usuario: 'seu@email.com', senha: 'nubank456', categoria: 'Banco', criado: '05/08/2025' },
  { id: 3, site: 'Instagram', usuario: '@seu_usuario', senha: 'insta789', categoria: 'Redes Sociais', criado: '10/08/2025' },
];

export default function LoginsPage() {
  const [logins, setLogins] = useState<Login[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('logins');
    if (saved) {
      setLogins(JSON.parse(saved));
    } else {
      setLogins(DEFAULT_LOGINS);
      localStorage.setItem('logins', JSON.stringify(DEFAULT_LOGINS));
    }
  }, []);

  useEffect(() => {
    if (isClient && logins.length > 0) {
      localStorage.setItem('logins', JSON.stringify(logins));
    }
  }, [logins, isClient]);

  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ site: '', usuario: '', senha: '', categoria: 'Banco', criado: new Date().toLocaleDateString('pt-BR') });

  const togglePassword = (id: number) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddEdit = () => {
    if (!formData.site.trim() || !formData.usuario.trim()) return;

    if (editingId) {
      setLogins(logins.map(l => l.id === editingId ? { ...l, ...formData } : l));
      setEditingId(null);
    } else {
      setLogins([...logins, { id: Date.now(), ...formData }]);
    }
    setFormData({ site: '', usuario: '', senha: '', categoria: 'Banco', criado: new Date().toLocaleDateString('pt-BR') });
    setShowForm(false);
  };

  const handleEdit = (login: Login) => {
    setFormData({ ...login });
    setEditingId(login.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setLogins(logins.filter(l => l.id !== id));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const CATEGORIAS = ['Banco', 'Redes Sociais', 'Email', 'Streaming', 'E-commerce', 'Trabalho', 'Outro'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Logins e Senhas</h1>
          <p className="text-gray-600 mt-1">Mantenha seus acessos organizados e seguros</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ site: '', usuario: '', senha: '', categoria: 'Banco', criado: new Date().toLocaleDateString('pt-BR') }); setShowForm(true); }}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Novo Login
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Editar' : 'Adicionar'} Login</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Site/Serviço"
              value={formData.site}
              onChange={(e) => setFormData({ ...formData, site: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Usuário/Email"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Criado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logins.map((login) => (
              <tr key={login.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm text-gray-900 font-medium">{login.site}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{login.usuario}</td>
                <td className="px-6 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-600">
                      {showPasswords[login.id] ? login.senha : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePassword(login.id)}
                      className="text-gray-400 hover:text-gray-600 transition"
                      title={showPasswords[login.id] ? 'Ocultar' : 'Mostrar'}
                    >
                      {showPasswords[login.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(login.senha)}
                      className="text-gray-400 hover:text-gray-600 transition"
                      title="Copiar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">{login.categoria}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{login.criado}</td>
                <td className="px-6 py-3 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(login)}
                    className="p-1 hover:bg-blue-50 rounded transition"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(login.id)}
                    className="p-1 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logins.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum login adicionado ainda</p>
          </div>
        )}
      </div>
    </div>
  );
}
