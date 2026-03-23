import { z } from 'zod';

export const transactionSchema = z.object({
  description: z
    .string()
    .min(2, 'Description must be at least 2 characters')
    .max(100, 'Description must be under 100 characters'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be greater than 0')
    .max(1_000_000, 'Amount too large'),
  category: z.enum(
    ['salary', 'freelance', 'investment', 'food', 'transport', 'entertainment', 'shopping', 'bills', 'other'],
    { errorMap: () => ({ message: 'Please select a valid category' }) }
  ),
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().max(200, 'Notes must be under 200 characters').optional(),
});

export const CATEGORIES = [
  { value: 'salary',        label: 'Salary',        icon: '💼', color: '#10b981' },
  { value: 'freelance',     label: 'Freelance',      icon: '💻', color: '#6366f1' },
  { value: 'investment',    label: 'Investment',     icon: '📈', color: '#f59e0b' },
  { value: 'food',          label: 'Food',           icon: '🍔', color: '#ef4444' },
  { value: 'transport',     label: 'Transport',      icon: '🚗', color: '#3b82f6' },
  { value: 'entertainment', label: 'Entertainment',  icon: '🎬', color: '#8b5cf6' },
  { value: 'shopping',      label: 'Shopping',       icon: '🛍️', color: '#ec4899' },
  { value: 'bills',         label: 'Bills',          icon: '📄', color: '#f97316' },
  { value: 'other',         label: 'Other',          icon: '📦', color: '#64748b' },
];
