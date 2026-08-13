import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: 'green' | 'blue' | 'red' | 'teal';
}

const colorMap = {
  green: 'from-green-50 to-green-100 text-green-600 border-green-200',
  blue: 'from-blue-50 to-blue-100 text-blue-600 border-blue-200',
  red: 'from-red-50 to-red-100 text-red-600 border-red-200',
  teal: 'from-teal-50 to-teal-100 text-teal-600 border-teal-200',
};

export default function StatCard({
  icon,
  title,
  value,
  change,
  isPositive,
  color,
}: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-lg p-6 shadow-sm hover:shadow-md transition`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-white rounded-lg opacity-80">
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 mt-3 text-xs font-medium">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>{change}</span>
      </div>
    </div>
  );
}
