'use client';

import { BarChart3, TrendingUp, Download } from 'lucide-react';
import ChartContainer from '@/components/ChartContainer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { mes: 'Jan', receita: 5000, despesa: 3200, lucro: 1800 },
  { mes: 'Fev', receita: 6200, despesa: 3800, lucro: 2400 },
  { mes: 'Mar', receita: 5800, despesa: 3500, lucro: 2300 },
  { mes: 'Abr', receita: 7200, despesa: 4100, lucro: 3100 },
  { mes: 'Mai', receita: 8500, despesa: 4200, lucro: 4300 },
  { mes: 'Jun', receita: 7800, despesa: 3900, lucro: 3900 },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios Financeiros</h1>
          <p className="text-gray-600 mt-1">Análise completa de suas finanças</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition">
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Recebido (6 meses)</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {monthlyData.reduce((a, b) => a + b.receita, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Gasto (6 meses)</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {monthlyData.reduce((a, b) => a + b.despesa, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Lucro Total (6 meses)</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            R$ {monthlyData.reduce((a, b) => a + b.lucro, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Melhor Mês</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {monthlyData.reduce((a, b) => (a.lucro > b.lucro ? a : b)).mes}
          </p>
        </div>
      </div>

      {/* Gráfico de Receitas x Despesas */}
      <ChartContainer title="Receitas vs Despesas (Últimos 6 Meses)" icon={<BarChart3 className="w-5 h-5" />}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
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
            <Tooltip />
            <Line type="monotone" dataKey="lucro" stroke="#22C55E" strokeWidth={3} dot={{ r: 5 }} name="Lucro" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
