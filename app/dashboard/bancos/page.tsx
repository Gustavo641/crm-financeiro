'use client';

import { useState } from 'react';
import { Plus, Building2, Edit2, Trash2, X } from 'lucide-react';

interface Banco {
  id: number;
  nome: string;
  saldo: number;
  tipo: string;
  status: 'Ativo' | 'Inativo';
}

export default function BancosPage() {
  const [bancos, setBancos] = useState<Banco[]>([
    { id: 1, nome: 'Itaú', saldo: 5250.50, tipo: 'Conta Corrente', status: 'Ativo' },
    { id: 2, nome: 'Nubank', saldo: 3200.00, tipo: 'Conta Poupança', status: 'Ativo' },
    { id: 3, nome: 'C6 Bank', saldo: 4050.75, tipo: 'Conta Investimento', status: 'Ativo' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nome: '', saldo: 0, tipo: '', status: 'Ativo' as 'Ativo' | 'Inativo' });

  const handleAddEdit = () => {
    if (!formData.nome.trim()) return;

    if (editingId) {
      setBancos(bancos.map(b => b.id === editingId ? { ...b, ...formData } : b));
      setEditingId(null);
    } else {
      setBancos([...bancos, { id: Date.now(), ...formData }]);
    }
    setFormData({ nome: '', saldo: 0, tipo: '', status: 'Ativo' });
    setShowForm(false);
  };

  const handleEdit = (banco: Banco) => {
    setFormData({ ...banco });
    setEditingId(banco.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setBancos(bancos.filter(b => b.id !== id));
  };

  const saldoTotal = bancos.reduce((acc, b) => acc + b.saldo, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Bancos e Contas</h1>
          <p className="text-gray-600 mt-1">Visualize seus saldos por banco</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ nome: '', saldo: 0, tipo: '', status: 'Ativo' }); setShowForm(true); }}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Adicionar Banco
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Editar' : 'Adicionar'} Banco</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do Banco"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Saldo"
              step="0.01"
              value={formData.saldo || ''}
              onChange={(e) => setFormData({ ...formData, saldo: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Tipo (ex: Conta Corrente)"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Ativo' | 'Inativo' })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
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

      {/* Total */}
      <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-lg shadow p-6">
        <p className="text-sm opacity-90">Saldo Total</p>
        <p className="text-4xl font-bold mt-2">
          R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bancos.map((banco) => (
          <div key={banco.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-sky-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600">{banco.nome}</p>
                <p className="text-xs text-gray-500 mt-1">{banco.tipo}</p>
              </div>
              <Building2 className="w-8 h-8 text-sky-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {banco.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                ✓ {banco.status}
              </span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(banco)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(banco.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
