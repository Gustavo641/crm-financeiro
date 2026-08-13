'use client';

import { useState } from 'react';
import { Plus, Filter, Download, Edit2, Trash2, Search } from 'lucide-react';

export default function ReceitasPage() {
  const [showForm, setShowForm] = useState(false);
  const [receitas] = useState([
    { id: 1, descricao: 'Salário', valor: 5000, data: '01/08/2025', categoria: 'Salário', status: 'Recebido', banco: 'Itaú' },
    { id: 2, descricao: 'Freelance', valor: 1500, data: '15/08/2025', categoria: 'Freelance', status: 'Pendente', banco: 'Itaú' },
    { id: 3, descricao: 'Bônus', valor: 2000, data: '20/08/2025', categoria: 'Bônus', status: 'Pendente', banco: 'Nubank' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Receitas</h1>
          <p className="text-gray-600 mt-1">Controle todos os seus ganhos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Nova Receita
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Registrar Nova Receita</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" placeholder="Descrição" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="number" placeholder="Valor" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>Salário</option>
              <option>Freelance</option>
              <option>Bônus</option>
              <option>Investimentos</option>
              <option>Outros</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>Itaú</option>
              <option>Nubank</option>
              <option>Banco do Brasil</option>
              <option>Outro</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>🟢 Recebido</option>
              <option>🟡 Pendente</option>
              <option>🔴 Atrasado</option>
            </select>
            <button type="submit" className="md:col-span-1 lg:col-span-1 gradient-primary text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
              Salvar
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="md:col-span-1 lg:col-span-1 bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar receita..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter className="w-5 h-5" />
          Filtrar
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {receitas.map((receita) => (
              <tr key={receita.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm text-gray-900">{receita.descricao}</td>
                <td className="px-6 py-3 text-sm font-semibold text-green-600">R$ {receita.valor.toFixed(2)}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{receita.data}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{receita.categoria}</td>
                <td className="px-6 py-3 text-sm">
                  {receita.status === 'Recebido' ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🟢 {receita.status}</span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">🟡 {receita.status}</span>
                  )}
                </td>
                <td className="px-6 py-3 text-sm flex items-center gap-2">
                  <button className="p-1 hover:bg-blue-50 rounded transition">
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-1 hover:bg-red-50 rounded transition">
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
