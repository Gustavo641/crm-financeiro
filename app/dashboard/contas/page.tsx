'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Check, Clock, Edit2, Trash2, Plus, X } from 'lucide-react';

interface Conta {
  id: number;
  descricao: string;
  valor: number;
  vencimento: string;
  status: 'a-vencer' | 'vencida' | 'paga';
}

const DEFAULT_CONTAS: Conta[] = [
  { id: 1, descricao: 'Conta de Luz', valor: 250, vencimento: '18/08/2025', status: 'a-vencer' },
  { id: 2, descricao: 'Internet', valor: 120, vencimento: '20/08/2025', status: 'a-vencer' },
  { id: 3, descricao: 'Fatura Cartão', valor: 1500, vencimento: '10/08/2025', status: 'vencida' },
  { id: 4, descricao: 'Aluguel', valor: 2000, vencimento: '01/08/2025', status: 'paga' },
];

export default function ContasPage() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('contas');
    if (saved) {
      setContas(JSON.parse(saved));
    } else {
      setContas(DEFAULT_CONTAS);
      localStorage.setItem('contas', JSON.stringify(DEFAULT_CONTAS));
    }
  }, []);

  useEffect(() => {
    if (isClient && contas.length > 0) {
      localStorage.setItem('contas', JSON.stringify(contas));
    }
  }, [contas, isClient]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ descricao: '', valor: 0, vencimento: '', status: 'a-vencer' });

  const handleAddEdit = () => {
    if (editingId) {
      setContas(contas.map(c => c.id === editingId ? { ...c, ...formData, status: formData.status as Conta['status'] } : c));
      setEditingId(null);
    } else {
      setContas([...contas, { id: Date.now(), descricao: formData.descricao, valor: formData.valor, vencimento: formData.vencimento, status: formData.status as Conta['status'] }]);
    }
    setFormData({ descricao: '', valor: 0, vencimento: '', status: 'a-vencer' });
    setShowForm(false);
  };

  const handleEdit = (conta: Conta) => {
    setFormData({ descricao: conta.descricao, valor: conta.valor, vencimento: conta.vencimento, status: conta.status });
    setEditingId(conta.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setContas(contas.filter(c => c.id !== id));
  };

  const calcularDias = (vencimento: string) => {
    const [dia, mes, ano] = vencimento.split('/').map(Number);
    const dataVencimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    const diferenca = Math.floor((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diferenca;
  };

  const contasAVencer = contas.filter(c => c.status === 'a-vencer');
  const contasVencidas = contas.filter(c => c.status === 'vencida');
  const contasPagas = contas.filter(c => c.status === 'paga');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas a Pagar</h1>
          <p className="text-gray-600 mt-1">Acompanhe seus vencimentos de forma prática</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ descricao: '', valor: 0, vencimento: '', status: 'a-vencer' }); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" /> Nova Conta
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Editar' : 'Adicionar'} Conta</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Valor"
              value={formData.valor || ''}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Vencimento (DD/MM/YYYY)"
              value={formData.vencimento}
              onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'a-vencer' | 'vencida' | 'paga' })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="a-vencer">A Vencer</option>
              <option value="vencida">Vencida</option>
              <option value="paga">Paga</option>
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

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">A Vencer</p>
              <p className="text-2xl font-bold text-yellow-900">{contasAVencer.length}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500 opacity-20" />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Vencidas</p>
              <p className="text-2xl font-bold text-red-900">{contasVencidas.length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-500 opacity-20" />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Pagas</p>
              <p className="text-2xl font-bold text-green-900">{contasPagas.length}</p>
            </div>
            <Check className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Contas a Vencer */}
      {contasAVencer.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">📅 Contas a Vencer</h2>
          <div className="space-y-3">
            {contasAVencer.map((conta) => (
              <div key={conta.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:shadow-md transition">
                <div>
                  <p className="font-medium text-gray-900">{conta.descricao}</p>
                  <p className="text-sm text-gray-600">Vence em {conta.vencimento}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
                    <p className="text-xs text-yellow-700">Faltam {calcularDias(conta.vencimento)} dias</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(conta)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(conta.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contas Vencidas */}
      {contasVencidas.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">🔴 Contas Vencidas</h2>
          <div className="space-y-3">
            {contasVencidas.map((conta) => (
              <div key={conta.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition">
                <div>
                  <p className="font-medium text-gray-900">{conta.descricao}</p>
                  <p className="text-sm text-gray-600">Venceu em {conta.vencimento}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
                    <p className="text-xs text-red-700">Atrasado há {Math.abs(calcularDias(conta.vencimento))} dias</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(conta)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(conta.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contas Pagas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-lg text-gray-900 mb-4">🟢 Contas Pagas</h2>
        {contasPagas.length > 0 ? (
          <div className="space-y-3">
            {contasPagas.map((conta) => (
              <div key={conta.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition">
                <div>
                  <p className="font-medium text-gray-900">{conta.descricao}</p>
                  <p className="text-sm text-gray-600">Pago em {conta.vencimento}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(conta)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(conta.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">Nenhuma conta paga registrada</p>
        )}
      </div>
    </div>
  );
}
