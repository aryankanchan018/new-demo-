import { useEffect, lazy, Suspense } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import StatCard from '../components/ui/StatCard';
import TransactionList from '../components/transactions/TransactionList';

const CategoryPieChart = lazy(() => import('../components/charts/CategoryPieChart'));
const CashFlowChart    = lazy(() => import('../components/charts/CashFlowChart'));

const ChartSkeleton = () => (
  <div className="card animate-pulse">
    <div className="h-5 w-40 bg-white/10 rounded mb-4" />
    <div className="h-48 bg-white/5 rounded-xl" />
  </div>
);

const Dashboard = () => {
  const { summary, fetch } = useTransactions();

  useEffect(() => { fetch(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Balance"  amount={summary.balance} icon="💰" color="bg-primary-500" />
        <StatCard title="Total Income"   amount={summary.income}  icon="📈" color="bg-emerald-500" />
        <StatCard title="Total Expenses" amount={summary.expense} icon="📉" color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <CategoryPieChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <CashFlowChart />
        </Suspense>
      </div>

      <TransactionList />
    </div>
  );
};

export default Dashboard;
