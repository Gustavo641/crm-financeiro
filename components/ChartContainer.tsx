import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function ChartContainer({ title, icon, children }: ChartContainerProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        {icon && <div className="text-sky-500">{icon}</div>}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
