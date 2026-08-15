'use client';

import { useState } from 'react';
import { Plus, Target, Edit2, Trash2, X } from 'lucide-react';

interface Meta {
  id: number;
  nome: string;
  valorDesejado: number;
  valorAtual: number;
}

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([
    { id: 1, nome: '🚗 Comprar Carro', valorDesejado: 50000, valorAtual: 12500 },
    { id: 2, nome: '🏠 Comprar Imóvel', valorDesejado: 300000, valorAtual: 75000 },
    { id: 3, nome: '✈️ Viajar para Miami', valorDesejado: 15000, valorAtual: 8500 },
    { id: 4, nome: '💻 Comprar Notebook', valorDesejado: 5000, valorAtual: 4200 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nome: '', valorDesejado: 0, valorAtual: 0 });

  const handleAddEdit = () => {
    if (!formData.nome.trim()) return;

    if (editingId) {
      setMetas(metas.map(m => m.id === editingId ? { ...m, ...formData } : m));
      setEditingId(null);
    } else {
      setMetas([...metas, { id: Date.now(), ...formData }]);
    }
    setFormData({ nome: '', valorDesejado: 0, valorAtual: 0 });
    setShowForm(false);
  };

  const handleEdit = (meta: Meta) => {
    setFormData({ nome: meta.nome, valorDesejado: meta.valorDesejado, valorAtual: meta.valorAtual });
    setEditingId(meta.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setMetas(metas.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas Financeiras</h1>
          <p className="text-gray-600 mt-1">Acompanhe o progresso de seus objetivos</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ nome: '', valorDesejado: 0, valorAtual: 0 }); setShowForm(true); }}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Editar' : 'Adicionar'} Meta</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome da Meta"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Valor Desejado"
              value={formData.valorDesejado || ''}
              onChange={(e) => setFormData({ ...formData, valorDesejado: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Valor Atual"
              value={formData.valorAtual || ''}
              onChange={(e) => setFormData({ ...formData, valorAtual: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        {metas.map((meta) => {
          const percentual = Math.round((meta.valorAtual / meta.valorDesejado) * 100);
          return (
            <div key={meta.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{meta.nome}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    R$ {meta.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {meta.valorDesejado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Target className="w-6 h-6 text-sky-500" />
              </div>

              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${Math.min(percentual, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">{percentual}%</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(meta)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(meta.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
