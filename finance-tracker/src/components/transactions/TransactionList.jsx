import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import TransactionItem from './TransactionItem';
import EmptyState from '../ui/EmptyState';
import Modal from '../ui/Modal';
import TransactionForm from './TransactionForm';
import { useTransactions } from '../../hooks/useTransactions';
import toast from 'react-hot-toast';

const TransactionList = () => {
  const { transactions, status, filter, search, setFilter, setSearch, add, update, remove } = useTransactions();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      await add(data);
      toast.success('Transaction added!');
      setShowAdd(false);
    } catch { toast.error('Failed to add transaction'); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      await update(editing.id, data);
      toast.success('Transaction updated!');
      setEditing(null);
    } catch { toast.error('Failed to update transaction'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      toast.success('Transaction deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Transactions</h2>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {['all', 'income', 'expense'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {status === 'loading' ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState icon="💸" title="No transactions found" description="Add your first transaction to get started tracking your finances." />
        ) : (
          transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} onEdit={setEditing} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Transaction">
        <TransactionForm onSubmit={handleAdd} isLoading={loading} />
      </Modal>
      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Transaction">
        {editing && <TransactionForm onSubmit={handleUpdate} defaultValues={editing} isLoading={loading} />}
      </Modal>
    </div>
  );
};

export default TransactionList;
