import { TrendingUp } from 'lucide-react';

const Navbar = () => (
  <nav className="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-600 rounded-xl">
          <TrendingUp size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">FinanceTracker</h1>
          <p className="text-xs text-slate-400">Personal Finance Manager</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
