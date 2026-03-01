export const validateParticipantName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (name.trim().length > 50) {
    return { valid: false, error: 'Name must be less than 50 characters' };
  }
  return { valid: true };
};

export const validateExpense = (expense) => {
  const { description, amount, paidBy, splitAmong } = expense;

  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Description is required' };
  }
  if (description.trim().length > 100) {
    return { valid: false, error: 'Description must be less than 100 characters' };
  }

  const parsedAmount = parseFloat(amount);
  if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
    return { valid: false, error: 'Amount must be a positive number' };
  }
  if (parsedAmount > 1000000) {
    return { valid: false, error: 'Amount is too large' };
  }

  if (!paidBy || paidBy.trim().length === 0) {
    return { valid: false, error: 'Payer is required' };
  }

  if (!splitAmong || splitAmong.length === 0) {
    return { valid: false, error: 'Must select at least one person to split between' };
  }

  return { valid: true };
};

export const sanitizeInput = (input) => {
  return String(input)
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS
    .slice(0, 200); // Limit length
};
