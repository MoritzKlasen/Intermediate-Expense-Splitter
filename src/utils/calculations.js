export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};

export const calculateExpensesByCategory = (expenses) => {
  const byCategory = {};
  expenses.forEach((expense) => {
    const category = expense.category || 'other';
    byCategory[category] = (byCategory[category] || 0) + expense.amount;
  });
  return byCategory;
};

export const calculateExpensesByPayer = (expenses) => {
  const byPayer = {};
  expenses.forEach((expense) => {
    byPayer[expense.paidBy] = (byPayer[expense.paidBy] || 0) + expense.amount;
  });
  return byPayer;
};

export const calculateAverageExpense = (expenses) => {
  if (expenses.length === 0) return 0;
  return calculateTotalExpenses(expenses) / expenses.length;
};

export const getHighestExpense = (expenses) => {
  if (expenses.length === 0) return null;
  return expenses.reduce((max, expense) =>
    expense.amount > max.amount ? expense : max
  );
};

export const getParticipantStats = (participants, expenses) => {
  const stats = {};

  participants.forEach((person) => {
    const paid = expenses
      .filter(e => e.paidBy === person)
      .reduce((sum, e) => sum + e.amount, 0);

    const owes = expenses
      .filter(e => e.splitAmong.includes(person))
      .reduce((sum, e) => sum + (e.amount / e.splitAmong.length), 0);

    stats[person] = {
      paid,
      owes,
      balance: paid - owes,
    };
  });

  return stats;
};
