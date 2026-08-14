'use client';

import { useMemo } from 'react';
import { useFinancialStore } from '@/lib/store';
import { TrendingUp, TrendingDown, Target, AlertCircle, PieChart, BarChart3, Wallet } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ChartContainer from '@/components/ChartContainer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

export default function DashboardPage() {
  const { receitas, despesas, metas, bancos, comissoes } = useFinancialStore();

  // Cálculos
  const totalReceitas = useMemo(() => receitas.reduce((sum, r) => sum + r.valor, 0), [receitas]);
  const totalDespesas = useMemo(() => despesas.reduce((sum, d) => sum + d.valor, 0), [despesas]);
  const saldoAtual = useMemo(() => bancos.reduce((sum, b) => sum + b.saldo, 0), [bancos]);
  const economia = totalReceitas - totalDespesas;

  const receitasRecebidas = useMemo(
    () => receitas.filter((r) => r.status === 'recebido').reduce((sum, r) => sum + r.valor, 0),
    [receitas]
  );

  const receitasPendentes = useMemo(
    () => receitas.filter((r) => r.status === 'pendente').reduce((sum, r) => sum + r.valor, 0),
    [receitas]
  );

  const despesasPagas = useMemo(
    () => despesas.filter((d) => d.status === 'pago').reduce((sum, d) => sum + d.valor, 0),
    [despesas]
  );

  // Dados por categoria (últimas despesas)
  const despesasPorCategoria = useMemo(() => {
    const categories: { [key: string]: number } = {};
    despesas.forEach((d) => {
      categories[d.categoria] = (categories[d.categoria] || 0) + d.valor;
    });
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [despesas]);

  const colors = ['#EF4444', '#F59E0B', '#6366F1', '#8B5CF6', '#EC4899', '#94A3B8'];

  // Comissões
  const comissoesRecebidas = useMemo(
    () => comissoes.filter((c) => c.status === 'recebida').reduce((sum, c) => sum + c.comissaoPrevista, 0),
    [comissoes]
  );

  const comissoesAguardando = useMemo(
    () => comissoes.filter((c) => c.status === 'aguardando').reduce((sum, c) => sum + c.comissaoPrevista, 0),
    [comissoes]
  );

  // Progresso de metas
  const metasCompletas = metas.filter((m) => m.valorAtual >= m.valorDesejado).length;

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📊 Seu Painel Financeiro</h1>
        <p className="text-gray-600 mt-1">Controle completo do seu dinheiro em um só lugar</p>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Wallet className="w-6 h-6" />}
          title="Saldo Atual"
          value={`R$ ${saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={`${bancos.length} banco(s)`}
          isPositive={saldoAtual > 0}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Receitas Recebidas"
          value={`R$ ${receitasRecebidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={`${receitas.filter((r) => r.status === 'recebido').length} registros`}
          isPositive={true}
          color="green"
        />
        <StatCard
          icon={<TrendingDown className="w-6 h-6" />}
          title="Despesas Pagas"
          value={`R$ ${despesasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={`${despesas.filter((d) => d.status === 'pago').length} registros`}
          isPositive={true}
          color="red"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Economia"
          value={`R$ ${economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={`${metasCompletas}/${metas.length} metas`}
          isPositive={economia > 0}
          color="emerald"
        />
      </div>

      {/* KPIs Comissões Imobiliárias */}
      {comissoes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Comissões Recebidas</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">R$ {comissoesRecebidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-1">{comissoes.filter((c) => c.status === 'recebida').length} comissões</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Comissões Aguardando</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">R$ {comissoesAguardando.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-1">{comissoes.filter((c) => c.status === 'aguardando').length} comissões</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Receitas Pendentes</h3>
            <p className="text-sm text-green-700">R$ {receitasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Despesas Pendentes</h3>
            <p className="text-sm text-yellow-700">R$ {despesas.filter((d) => d.status === 'pendente').reduce((sum, d) => sum + d.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Total de Metas</h3>
            <p className="text-sm text-blue-700">{metas.length} objetivos financeiros ativas</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receitas x Despesas */}
        <ChartContainer title="Receitas vs Despesas (Últimos 6 meses)" icon={<BarChart3 className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { mes: 'Jun', receitas: 7000, despesas: 3500 },
                { mes: 'Jul', receitas: 8200, despesas: 3800 },
                { mes: 'Ago', receitas: totalReceitas, despesas: totalDespesas },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value}`} />
              <Legend />
              <Bar dataKey="receitas" fill="#10B981" name="Receitas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="despesas" fill="#EF4444" name="Despesas" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Gráfico de Categoria */}
        <ChartContainer title="Despesas por Categoria" icon={<PieChart className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsChart>
              <Pie
                data={despesasPorCategoria}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: R$ ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {despesasPorCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </RechartsChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-xl">⚡</span> Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/dashboard/receitas"
            className="px-4 py-3 bg-white hover:bg-green-50 rounded-lg text-sm text-gray-700 font-medium transition border border-gray-200 hover:border-green-300"
          >
            ➕ Registrar Receita
          </Link>
          <Link
            href="/dashboard/despesas"
            className="px-4 py-3 bg-white hover:bg-red-50 rounded-lg text-sm text-gray-700 font-medium transition border border-gray-200 hover:border-red-300"
          >
            ➕ Registrar Despesa
          </Link>
          <Link
            href="/dashboard/metas"
            className="px-4 py-3 bg-white hover:bg-blue-50 rounded-lg text-sm text-gray-700 font-medium transition border border-gray-200 hover:border-blue-300"
          >
            🎯 Acompanhar Metas
          </Link>
        </div>
      </div>
    </div>
  );
}
