'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, AlertCircle, PieChart, BarChart3 } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ChartContainer from '@/components/ChartContainer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsChart, Pie, Cell } from 'recharts';

const mockData = {
  saldoAtual: 12500.00,
  receitasMes: 8500.00,
  despesasMes: 4200.00,
  contasVencer: 3,
  contasAtrasadas: 1,
  metasProgress: 65,
};

const chartData = [
  { mes: 'Jan', receitas: 5000, despesas: 3200 },
  { mes: 'Fev', receitas: 6200, despesas: 3800 },
  { mes: 'Mar', receitas: 5800, despesas: 3500 },
  { mes: 'Abr', receitas: 7200, despesas: 4100 },
  { mes: 'Mai', receitas: 8500, despesas: 4200 },
];

const categoryData = [
  { name: 'Alimentação', value: 1200, fill: '#EF4444' },
  { name: 'Transporte', value: 800, fill: '#F59E0B' },
  { name: 'Casa', value: 1500, fill: '#6366F1' },
  { name: 'Outros', value: 700, fill: '#94A3B8' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao seu painel financeiro</h1>
        <p className="text-gray-600 mt-1">Acompanhe seus ganhos, gastos e metas em tempo real</p>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Saldo Atual"
          value={`R$ ${mockData.saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+12.5%"
          isPositive={true}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Receitas (Mês)"
          value={`R$ ${mockData.receitasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+8.2%"
          isPositive={true}
          color="blue"
        />
        <StatCard
          icon={<TrendingDown className="w-6 h-6" />}
          title="Despesas (Mês)"
          value={`R$ ${mockData.despesasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="-3.1%"
          isPositive={true}
          color="red"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Economia"
          value={`R$ ${(mockData.receitasMes - mockData.despesasMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={`${mockData.metasProgress}% da meta`}
          isPositive={true}
          color="teal"
        />
      </div>

      {/* Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Contas a vencer</h3>
            <p className="text-sm text-yellow-700">{mockData.contasVencer} contas vencem nos próximos 7 dias</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Contas atrasadas</h3>
            <p className="text-sm text-red-700">{mockData.contasAtrasadas} conta está vencida</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receitas x Despesas */}
        <ChartContainer title="Receitas vs Despesas" icon={<BarChart3 className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="receitas" fill="#0EA5E9" name="Receitas" />
              <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Gráfico de Categoria */}
        <ChartContainer title="Gastos por Categoria" icon={<PieChart className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: R$ ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </RechartsChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Próximas Ações */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Próximas Ações</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded text-sm text-gray-700">
            ➕ Registrar nova receita
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded text-sm text-gray-700">
            ➕ Registrar nova despesa
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded text-sm text-gray-700">
            🎯 Acompanhar metas
          </button>
        </div>
      </div>
    </div>
  );
}
