'use client';

import { useState, useMemo } from 'react';
import { useFinancialStore, type Receita } from '@/lib/store';
import { Plus, Download, Edit2, Trash2, Search, X } from 'lucide-react';

const CATEGORIAS = ['Salário', 'Freelance', 'Bônus', 'Investimentos', 'Comissão', 'Aluguel', 'Outros'];
const BANCOS = ['Itaú', 'Bradesco', 'Nubank', 'Banco do Brasil', 'Santander', 'Caixa', 'C6', 'Inter'];
const STATUS_OPTIONS = ['recebido', 'pendente', 'atrasado'];

export default function ReceitasPage() {
  const { receitas, addReceita, updateReceita, deleteReceita } = useFinancialStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterCategoria, setFilterCategoria] = useState<string>('');

  const [formData, setFormData] = useState({
    descricao: '',
    valor: 0,
    data: new Date().toISOString().split('T')[0],
    categoria: 'Salário',
    banco: 'Itaú',
    cliente: '',
    status: 'pendente',
    tipo: 'receita',
  });

  const receitasFiltradas = useMemo(() => {
    return receitas.filter((r) => {
      const matchSearch =
        r.descricao.toLowerCase().includes(search.toLowerCase()) ||
        r.cliente?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filterStatus || r.status === filterStatus;
      const matchCategoria = !filterCategoria || r.categoria === filterCategoria;
      return matchSearch && matchStatus && matchCategoria;
    });
  }, [receitas, search, filterStatus, filterCategoria]);

  const totalRecebido = receitasFiltradas
    .filter((r) => r.status === 'recebido')
    .reduce((sum, r) => sum + r.valor, 0);

  const totalPendente = receitasFiltradas
    .filter((r) => r.status === 'pendente')
    .reduce((sum, r) => sum + r.valor, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateReceita(editingId, { ...formData, status: formData.status as 'recebido' | 'pendente' | 'atrasado', tipo: formData.tipo as 'receita' });
      setEditingId(null);
    } else {
      addReceita({ ...formData, status: formData.status as 'recebido' | 'pendente' | 'atrasado', tipo: formData.tipo as 'receita' });
    }

    setFormData({
      descricao: '',
      valor: 0,
      data: new Date().toISOString().split('T')[0],
      categoria: 'Salário',
      banco: 'Itaú',
      cliente: '',
      status: 'pendente',
      tipo: 'receita',
    });
    setShowForm(false);
  };

  const handleEdit = (receita: Receita) => {
    setFormData({
      descricao: receita.descricao,
      valor: receita.valor,
      data: receita.data,
      categoria: receita.categoria,
      banco: receita.banco,
      cliente: receita.cliente || '',
      status: receita.status,
      tipo: receita.tipo,
    });
    setEditingId(receita.id);
    setShowForm(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recebido':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🟢 Recebido</span>;
      case 'pendente':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">🟡 Pendente</span>;
      case 'atrasado':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">🔴 Atrasado</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💰 Receitas</h1>
          <p className="text-gray-600 mt-1">Controle todos os seus ganhos e comissões</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              descricao: '',
              valor: 0,
              data: new Date().toISOString().split('T')[0],
              categoria: 'Salário',
              banco: 'Itaú',
              cliente: '',
              status: 'pendente',
              tipo: 'receita',
            });
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Nova Receita
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-medium">Total Recebido</p>
          <p className="text-2xl font-bold text-green-600 mt-2">R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 font-medium">Total Pendente</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total de Registros</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{receitasFiltradas.length}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">{editingId ? 'Editar' : 'Registrar Nova'} Receita</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              placeholder="Valor"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={formData.banco}
              onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {BANCOS.map((banco) => (
                <option key={banco} value={banco}>
                  {banco}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Cliente (opcional)"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="receita">Receita</option>
              <option value="comissao">Comissão</option>
            </select>
            <button type="submit" className="bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition">
              {editingId ? 'Atualizar' : 'Salvar'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar receita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos os Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todas as Categorias</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Banco</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {receitasFiltradas.map((receita) => (
              <tr key={receita.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm text-gray-900">{receita.descricao}</td>
                <td className="px-6 py-3 text-sm font-semibold text-green-600">R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{new Date(receita.data).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{receita.categoria}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{receita.banco}</td>
                <td className="px-6 py-3 text-sm">{getStatusBadge(receita.status)}</td>
                <td className="px-6 py-3 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(receita)}
                    className="p-1 hover:bg-blue-50 rounded transition"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteReceita(receita.id)}
                    className="p-1 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {receitasFiltradas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma receita encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
