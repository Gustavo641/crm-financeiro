'use client';

import { Plus, Target } from 'lucide-react';

export default function MetasPage() {
  const metas = [
    { id: 1, nome: '🚗 Comprar Carro', valorDesejado: 50000, valorAtual: 12500, percentual: 25 },
    { id: 2, nome: '🏠 Comprar Imóvel', valorDesejado: 300000, valorAtual: 75000, percentual: 25 },
    { id: 3, nome: '✈️ Viajar para Miami', valorDesejado: 15000, valorAtual: 8500, percentual: 56 },
    { id: 4, nome: '💻 Comprar Notebook', valorDesejado: 5000, valorAtual: 4200, percentual: 84 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas Financeiras</h1>
          <p className="text-gray-600 mt-1">Acompanhe o progresso de seus objetivos</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg transition">
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metas.map((meta) => (
          <div key={meta.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{meta.nome}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  R$ {meta.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {meta.valorDesejado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Target className="w-6 h-6 text-sky-500" />
            </div>

            {/* Barra de Progresso */}
            <div className="mb-4">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${meta.percentual}%` }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">{meta.percentual}% concluído</span>
              <span className="text-gray-600">Faltam R$ {(meta.valorDesejado - meta.valorAtual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Botões */}
            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 px-4 py-2 bg-sky-100 text-sky-700 font-medium rounded-lg hover:bg-sky-200 transition">
                Adicionar
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
