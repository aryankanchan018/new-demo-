import { formatCurrency } from '../../utils/helpers';

const StatCard = ({ title, amount, icon, color, trend }) => (
  <div className="card glass-hover group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <span className="text-2xl">{icon}</span>
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
    <p className="text-2xl font-bold text-white">{formatCurrency(amount)}</p>
  </div>
);

export default StatCard;
