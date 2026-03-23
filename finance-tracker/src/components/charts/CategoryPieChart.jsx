import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTransactions } from '../../hooks/useTransactions';
import { CATEGORIES } from '../../schemas/transactionSchema';
import { formatCurrency } from '../../utils/helpers';
import EmptyState from '../ui/EmptyState';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const { categoryData } = useTransactions();
  const entries = Object.entries(categoryData);

  if (entries.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Expense Breakdown</h2>
        <EmptyState icon="📊" title="No expense data" description="Add expense transactions to see category breakdown." />
      </div>
    );
  }

  const labels = entries.map(([k]) => CATEGORIES.find(c => c.value === k)?.label || k);
  const values = entries.map(([, v]) => v);
  const colors = entries.map(([k]) => CATEGORIES.find(c => c.value === k)?.color || '#64748b');

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: colors.map(c => `${c}cc`),
      borderColor: colors,
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const options = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.raw)} (${((ctx.raw / values.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)`,
        },
      },
    },
  };

  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div className="card">
      <h2 className="text-lg font-bold text-white mb-4">Expense Breakdown</h2>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-slate-400">Total</p>
            <p className="text-base font-bold text-white">{formatCurrency(total)}</p>
          </div>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {entries.map(([key, val], i) => {
            const cat = CATEGORIES.find(c => c.value === key);
            const pct = ((val / total) * 100).toFixed(1);
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i] }} />
                <span className="text-sm text-slate-300 flex-1">{cat?.icon} {cat?.label}</span>
                <span className="text-sm font-semibold text-white">{formatCurrency(val)}</span>
                <span className="text-xs text-slate-500 w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
