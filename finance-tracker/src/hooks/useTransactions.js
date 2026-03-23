import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  fetchTransactions, addTransaction, updateTransaction,
  deleteTransaction, setFilter, setSearch,
} from '../store/slices/transactionsSlice';

export const useTransactions = () => {
  const dispatch = useDispatch();
  const { items, status, error, filter, search } = useSelector(s => s.transactions);

  const filtered = useMemo(() => {
    return items
      .filter(t => filter === 'all' || t.type === filter)
      .filter(t => t.description?.toLowerCase().includes(search.toLowerCase()));
  }, [items, filter, search]);

  const summary = useMemo(() => {
    const income  = items.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [items]);

  const categoryData = useMemo(() => {
    const expenses = items.filter(t => t.type === 'expense');
    const totals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return totals;
  }, [items]);

  const monthlyData = useMemo(() => {
    const months = {};
    items.forEach(t => {
      const month = t.date?.slice(0, 7);
      if (!month) return;
      if (!months[month]) months[month] = { income: 0, expense: 0 };
      months[month][t.type] += t.amount;
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6);
  }, [items]);

  return {
    transactions: filtered,
    allTransactions: items,
    status, error, filter, search, summary, categoryData, monthlyData,
    fetch:  ()           => dispatch(fetchTransactions()),
    add:    (data)       => dispatch(addTransaction(data)),
    update: (id, data)   => dispatch(updateTransaction({ id, data })),
    remove: (id)         => dispatch(deleteTransaction(id)),
    setFilter: (f)       => dispatch(setFilter(f)),
    setSearch: (s)       => dispatch(setSearch(s)),
  };
};
