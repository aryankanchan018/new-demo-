export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getToday = () => new Date().toISOString().split('T')[0];

export const CATEGORY_COLORS = {
  salary:        '#10b981',
  freelance:     '#6366f1',
  investment:    '#f59e0b',
  food:          '#ef4444',
  transport:     '#3b82f6',
  entertainment: '#8b5cf6',
  shopping:      '#ec4899',
  bills:         '#f97316',
  other:         '#64748b',
};
