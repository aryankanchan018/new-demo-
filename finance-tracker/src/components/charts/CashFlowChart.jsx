import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useTransactions } from '../../hooks/useTransactions';
import EmptyState from '../ui/EmptyState';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CashFlowChart = () => {
  const { monthlyData } = useTransactions();

  if (monthlyData.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Cash Flow Trends</h2>
        <EmptyState icon="📈" title="No trend data" description="Add transactions to see your monthly cash flow trends." />
      </div>
    );
  }

  const labels = monthlyData.map(([month]) => {
    const [y, m] = month.split('-');
    return new Date(y, m - 1).toLocaleString('default', { month: 'short', year: '2-digit' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(([, d]) => d.income),
        backgroundColor: '#10b98166',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(([, d]) => d.expense),
        backgroundColor: '#ef444466',
        borderColor: '#ef4444',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${ctx.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: '#ffffff08' } },
      y: { ticks: { color: '#64748b', callback: v => `$${v}` }, grid: { color: '#ffffff08' } },
    },
  };

  return (
    <div className="card">
      <h2 className="text-lg font-bold text-white mb-4">Cash Flow Trends</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CashFlowChart;
