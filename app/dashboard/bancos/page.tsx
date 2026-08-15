'use client';

import { Plus, Building2 } from 'lucide-react';

export default function BancosPage() {
  const bancos = [
    { id: 1, nome: 'Itaú', saldo: 5250.50, tipo: 'Conta Corrente', status: 'Ativo' },
    { id: 2, nome: 'Nubank', saldo: 3200.00, tipo: 'Conta Poupança', status: 'Ativo' },
    { id: 3, nome: 'C6 Bank', saldo: 4050.75, tipo: 'Conta Investimento', status: 'Ativo' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Bancos e Contas</h1>
          <p className="text-gray-600 mt-1">Visualize seus saldos por banco</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition">
          <Plus className="w-5 h-5" />
          Adicionar Banco
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-lg shadow p-6">
        <p className="text-sm opacity-90">Saldo Total</p>
        <p className="text-4xl font-bold mt-2">
          R$ {bancos.reduce((acc, b) => acc + b.saldo, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bancos.map((banco) => (
          <div key={banco.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-sky-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">{banco.nome}</p>
                <p className="text-xs text-gray-500 mt-1">{banco.tipo}</p>
              </div>
              <Building2 className="w-8 h-8 text-sky-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {banco.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                ✓ {banco.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
