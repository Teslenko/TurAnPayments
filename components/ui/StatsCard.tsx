interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-card/50 border border-border rounded-xl p-6 hover:bg-card/80 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↗' : '↘'} {trend.value}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-text mb-1">{value}</h3>
        <p className="text-sm text-muted mb-2">{title}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
    </div>
  );
}
