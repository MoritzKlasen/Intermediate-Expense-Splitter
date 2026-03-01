export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍽️', color: '#f97316' },
  { id: 'transport', label: 'Transport', icon: '🚗', color: '#06b6d4' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#a855f7' },
  { id: 'utilities', label: 'Utilities', icon: '💡', color: '#eab308' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'health', label: 'Health & Medical', icon: '⚕️', color: '#ef4444' },
  { id: 'accommodation', label: 'Accommodation', icon: '🏠', color: '#3b82f6' },
  { id: 'other', label: 'Other', icon: '📌', color: '#64748b' },
];

export const getCategoryById = (id) => {
  return EXPENSE_CATEGORIES.find(cat => cat.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
};

export const EXPENSE_SORTING = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  HIGHEST: 'highest',
  LOWEST: 'lowest',
};
