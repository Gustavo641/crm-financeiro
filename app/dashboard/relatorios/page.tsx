'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Download, FileText, Table2 } from 'lucide-react';
import ChartContainer from '@/components/ChartContainer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { mes: 'Jan', receita: 5000, despesa: 3200, lucro: 1800 },
  { mes: 'Fev', receita: 6200, despesa: 3800, lucro: 2400 },
  { mes: 'Mar', receita: 5800, despesa: 3500, lucro: 2300 },
  { mes: 'Abr', receita: 7200, despesa: 4100, lucro: 3100 },
  { mes: 'Mai', receita: 8500, despesa: 4200, lucro: 4300 },
  { mes: 'Jun', receita: 7800, despesa: 3900, lucro: 3900 },
];

const categoryData = [
  { name: 'Alimentação', value: 2400, color: '#EF4444' },
  { name: 'Transporte', value: 1800, color: '#F59E0B' },
  { name: 'Casa', value: 3200, color: '#6366F1' },
  { name: 'Internet', value: 600, color: '#8B5CF6' },
  { name: 'Saúde', value: 1200, color: '#EC4899' },
];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('6m');

  const exportCSV = () => {
    const csv = 'Mês,Receita,Despesa,Lucro\n' + monthlyData.map(d => `${d.mes},${d.receita},${d.despesa},${d.lucro}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportPDF = () => {
    alert('📄 Exportação PDF: Integrando com biblioteca PDF (jsPDF/pdfkit)');
  };

  const totalReceita = monthlyData.reduce((a, b) => a + b.receita, 0);
  const totalDespesa = monthlyData.reduce((a, b) => a + b.despesa, 0);
  const totalLucro = monthlyData.reduce((a, b) => a + b.lucro, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Relatórios Financeiros</h1>
          <p className="text-gray-600 mt-1">Análise completa e exportação de dados</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            <Download className="w-5 h-5" />
            CSV
          </button>
          <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            <FileText className="w-5 h-5" />
            PDF
          </button>
        </div>
      </div>

      {/* Filtro de Período */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-sky-500">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Período:</label>
        <div className="flex gap-2 flex-wrap">
          {['1m', '3m', '6m', '1a', 'tudo'].map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                periodo === p ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p === '1m' ? '1 Mês' : p === '3m' ? '3 Meses' : p === '6m' ? '6 Meses' : p === '1a' ? '1 Ano' : 'Tudo'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Recebido</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-2">📈 {periodo === '6m' ? '6 meses' : periodo}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Total Gasto</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-2">📉 {periodo === '6m' ? '6 meses' : periodo}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Lucro Total</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            R$ {totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-2">💰 Economia</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Taxa de Economia</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {((totalLucro / totalReceita) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">📊 Percentual</p>
        </div>
      </div>

      {/* Gráfico de Receitas x Despesas */}
      <ChartContainer title="Receitas vs Despesas" icon={<BarChart3 className="w-5 h-5" />}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
            <Legend />
            <Bar dataKey="receita" fill="#0EA5E9" name="Receitas" />
            <Bar dataKey="despesa" fill="#EF4444" name="Despesas" />
            <Bar dataKey="lucro" fill="#22C55E" name="Lucro" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Gráfico de Evolução */}
      <ChartContainer title="Evolução do Lucro" icon={<TrendingUp className="w-5 h-5" />}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
            <Line type="monotone" dataKey="lucro" stroke="#22C55E" strokeWidth={3} dot={{ r: 5 }} name="Lucro" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Gastos por Categoria */}
      <ChartContainer title="Despesas por Categoria" icon={<Table2 className="w-5 h-5" />}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: R$ ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Tabela Detalhada */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">📋 Resumo Mensal Detalhado</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Mês</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Receita</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Despesa</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Lucro</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Taxa %</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(d => (
                <tr key={d.mes} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{d.mes}</td>
                  <td className="text-right py-3 px-4 text-blue-600 font-semibold">R$ {d.receita.toLocaleString('pt-BR')}</td>
                  <td className="text-right py-3 px-4 text-red-600 font-semibold">R$ {d.despesa.toLocaleString('pt-BR')}</td>
                  <td className="text-right py-3 px-4 text-green-600 font-semibold">R$ {d.lucro.toLocaleString('pt-BR')}</td>
                  <td className="text-right py-3 px-4 text-gray-600">{((d.lucro / d.receita) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
