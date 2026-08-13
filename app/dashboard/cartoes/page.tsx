'use client';

import { Plus, CreditCard } from 'lucide-react';

export default function CartoesPage() {
  const cartoes = [
    {
      id: 1,
      nome: 'Nubank',
      ultimos: '****5555',
      limite: 5000,
      utilizado: 2300,
      fechamento: '10/08',
      vencimento: '20/08',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Itaú Personnalité',
      ultimos: '****8888',
      limite: 10000,
      utilizado: 4500,
      fechamento: '15/08',
      vencimento: '25/08',
      status: 'Ativo',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Cartões de Crédito</h1>
          <p className="text-gray-600 mt-1">Controle seus cartões e limite disponível</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition">
          <Plus className="w-5 h-5" />
          Novo Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartoes.map((cartao) => (
          <div
            key={cartao.id}
            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-lg p-6 border border-slate-700"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm text-slate-400 mb-1">{cartao.nome}</p>
                <p className="text-lg font-semibold">{cartao.ultimos}</p>
              </div>
              <CreditCard className="w-8 h-8 text-sky-400" />
            </div>

            {/* Limite */}
            <div className="mb-6">
              <p className="text-xs text-slate-400 mb-2">Limite Disponível</p>
              <p className="text-2xl font-bold mb-3">
                R$ {(cartao.limite - cartao.utilizado).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-500"
                  style={{ width: `${(cartao.utilizado / cartao.limite) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                R$ {cartao.utilizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {cartao.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Fechamento</p>
                <p className="font-semibold">{cartao.fechamento}</p>
              </div>
              <div>
                <p className="text-slate-400">Vencimento</p>
                <p className="font-semibold">{cartao.vencimento}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
