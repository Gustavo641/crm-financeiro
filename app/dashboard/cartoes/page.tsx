'use client';

import { useState } from 'react';
import { Plus, CreditCard, Edit2, Trash2, X } from 'lucide-react';

interface Cartao {
  id: number;
  nome: string;
  ultimos: string;
  limite: number;
  utilizado: number;
  fechamento: string;
  vencimento: string;
  status: 'Ativo' | 'Inativo';
}

export default function CartoesPage() {
  const [cartoes, setCartoes] = useState<Cartao[]>([
    { id: 1, nome: 'Nubank', ultimos: '****5555', limite: 5000, utilizado: 2300, fechamento: '10/08', vencimento: '20/08', status: 'Ativo' },
    { id: 2, nome: 'Itaú Personnalité', ultimos: '****8888', limite: 10000, utilizado: 4500, fechamento: '15/08', vencimento: '25/08', status: 'Ativo' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nome: '', ultimos: '', limite: 0, utilizado: 0, fechamento: '', vencimento: '', status: 'Ativo' as 'Ativo' | 'Inativo' });

  const handleAddEdit = () => {
    if (!formData.nome.trim()) return;

    if (editingId) {
      setCartoes(cartoes.map(c => c.id === editingId ? { ...c, ...formData } : c));
      setEditingId(null);
    } else {
      setCartoes([...cartoes, { id: Date.now(), ...formData }]);
    }
    setFormData({ nome: '', ultimos: '', limite: 0, utilizado: 0, fechamento: '', vencimento: '', status: 'Ativo' });
    setShowForm(false);
  };

  const handleEdit = (cartao: Cartao) => {
    setFormData({ ...cartao });
    setEditingId(cartao.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setCartoes(cartoes.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Cartões de Crédito</h1>
          <p className="text-gray-600 mt-1">Controle seus cartões e limite disponível</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ nome: '', ultimos: '', limite: 0, utilizado: 0, fechamento: '', vencimento: '', status: 'Ativo' }); setShowForm(true); }}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Novo Cartão
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Editar' : 'Adicionar'} Cartão</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do Cartão"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Últimos dígitos (ex: ****5555)"
              value={formData.ultimos}
              onChange={(e) => setFormData({ ...formData, ultimos: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Limite"
              value={formData.limite || ''}
              onChange={(e) => setFormData({ ...formData, limite: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Utilizado"
              value={formData.utilizado || ''}
              onChange={(e) => setFormData({ ...formData, utilizado: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Fechamento (ex: 10/08)"
              value={formData.fechamento}
              onChange={(e) => setFormData({ ...formData, fechamento: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Vencimento (ex: 20/08)"
              value={formData.vencimento}
              onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartoes.map((cartao) => {
          const percentualUso = Math.round((cartao.utilizado / cartao.limite) * 100);
          const disponivel = cartao.limite - cartao.utilizado;

          return (
            <div key={cartao.id} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-lg p-6 border border-slate-700 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <p className="text-sm text-slate-400">{cartao.nome}</p>
                  <p className="text-2xl font-bold mt-2">{cartao.ultimos}</p>
                </div>
                <CreditCard className="w-8 h-8 text-sky-400" />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-400">Limite Utilizado</p>
                  <span className="text-sm font-semibold">{percentualUso}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    style={{ width: `${Math.min(percentualUso, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-700">
                <div>
                  <p className="text-xs text-slate-400">Utilizado</p>
                  <p className="font-semibold">R$ {cartao.utilizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Disponível</p>
                  <p className="font-semibold text-green-400">R$ {disponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400">Fechamento: {cartao.fechamento}</p>
                  <p className="text-xs text-slate-400">Vencimento: {cartao.vencimento}</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">✓ {cartao.status}</span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(cartao)} className="flex-1 p-2 text-blue-400 hover:bg-blue-500/10 rounded transition">
                  <Edit2 className="w-4 h-4 mx-auto" />
                </button>
                <button onClick={() => handleDelete(cartao.id)} className="flex-1 p-2 text-red-400 hover:bg-red-500/10 rounded transition">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
