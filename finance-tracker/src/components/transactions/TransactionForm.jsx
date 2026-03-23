import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, CATEGORIES } from '../../schemas/transactionSchema';
import { getToday } from '../../utils/helpers';

const TransactionForm = ({ onSubmit, defaultValues, isLoading }) => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultValues || { type: 'expense', date: getToday() },
  });

  const type = watch('type');

  const submit = async (data) => {
    await onSubmit({ ...data, amount: parseFloat(data.amount) });
    if (!defaultValues) reset({ type: 'expense', date: getToday() });
  };

  const Field = ({ name, label, children }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl">
        {['income', 'expense'].map(t => (
          <label key={t} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg cursor-pointer font-semibold text-sm transition-all ${type === t ? (t === 'income' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white') : 'text-slate-400 hover:text-white'}`}>
            <input type="radio" value={t} {...register('type')} className="hidden" />
            {t === 'income' ? '↑' : '↓'} {t.charAt(0).toUpperCase() + t.slice(1)}
          </label>
        ))}
      </div>

      <Field name="description" label="Description">
        <input {...register('description')} placeholder="e.g. Monthly Salary" className="input-field" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field name="amount" label="Amount ($)">
          <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} placeholder="0.00" className="input-field" />
        </Field>
        <Field name="date" label="Date">
          <input type="date" {...register('date')} className="input-field" />
        </Field>
      </div>

      <Field name="category" label="Category">
        <select {...register('category')} className="input-field">
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
          ))}
        </select>
      </Field>

      <Field name="notes" label="Notes (optional)">
        <textarea {...register('notes')} placeholder="Add a note..." rows={2} className="input-field resize-none" />
      </Field>

      <button type="submit" disabled={isLoading} className="btn-primary w-full">
        {isLoading ? 'Saving...' : defaultValues ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
