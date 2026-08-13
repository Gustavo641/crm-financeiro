'use client';

import { AlertCircle, Check, Clock } from 'lucide-react';

export default function ContasPage() {
  const contasAVencer = [
    { id: 1, descricao: 'Conta de Luz', valor: 250, vencimento: '18/08/2025', dias: 5, status: 'a-vencer' },
    { id: 2, descricao: 'Internet', valor: 120, vencimento: '20/08/2025', dias: 7, status: 'a-vencer' },
  ];

  const contasVencidas = [
    { id: 3, descricao: 'Fatura Cartão', valor: 1500, vencimento: '10/08/2025', dias: -3, status: 'vencida' },
  ];

  const contasPagas = [
    { id: 4, descricao: 'Aluguel', valor: 2000, vencimento: '01/08/2025', dias: -12, status: 'paga' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contas a Pagar</h1>
        <p className="text-gray-600 mt-1">Acompanhe seus vencimentos de forma prática</p>
      </div>

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
              <div key={conta.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{conta.descricao}</p>
                  <p className="text-sm text-gray-600">Vence em {conta.vencimento}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
                  <p className="text-xs text-yellow-700">Faltam {conta.dias} dias</p>
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
              <div key={conta.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{conta.descricao}</p>
                  <p className="text-sm text-gray-600">Venceu em {conta.vencimento}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
                  <p className="text-xs text-red-700">Atrasado há {Math.abs(conta.dias)} dias</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contas Pagas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-lg text-gray-900 mb-4">🟢 Contas Pagas</h2>
        <div className="space-y-3">
          {contasPagas.map((conta) => (
            <div key={conta.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{conta.descricao}</p>
                <p className="text-sm text-gray-600">Pago em {conta.vencimento}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">R$ {conta.valor.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
