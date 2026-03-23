import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, CATEGORY_COLORS } from '../../utils/helpers';
import { CATEGORIES } from '../../schemas/transactionSchema';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const cat = CATEGORIES.find(c => c.value === transaction.category);
  const color = CATEGORY_COLORS[transaction.category] || '#64748b';

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(transaction.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group animate-fade-in border border-white/5">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}>
        {cat?.icon || '📦'}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-500">{formatDate(transaction.date)}</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-500">{cat?.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`font-bold text-base ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(transaction)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={handleDelete} disabled={deleting} className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
