export const ERROR_MESSAGES = {
  PARTICIPANT_NAME_REQUIRED: 'Please enter a participant name',
  PARTICIPANT_ALREADY_EXISTS: 'Participant already exists',
  EXPENSE_DESCRIPTION_REQUIRED: 'Please enter an expense description',
  EXPENSE_AMOUNT_REQUIRED: 'Please enter an amount',
  EXPENSE_PAYER_REQUIRED: 'Please select who paid',
  EXPENSE_SPLIT_REQUIRED: 'Please select at least one person to split between',
  FAILED_ADD_PARTICIPANT: 'Failed to add participant',
  FAILED_REMOVE_PARTICIPANT: 'Failed to remove participant',
  FAILED_ADD_EXPENSE: 'Failed to add expense',
  FAILED_DELETE_EXPENSE: 'Failed to delete expense',
  FAILED_EDIT_EXPENSE: 'Failed to edit expense',
  FAILED_CLEAR_EXPENSES: 'Failed to clear expenses',
};

export const CONFIRM_MESSAGES = {
  REMOVE_PARTICIPANT: (name) => `Remove ${name} from participants?`,
  DELETE_EXPENSE: 'Delete this expense?',
  CLEAR_EXPENSES: 'Clear all expenses? This cannot be undone.',
};

export const SUCCESS_MESSAGES = {
  PARTICIPANT_ADDED: 'Participant added successfully',
  EXPENSE_ADDED: 'Expense added successfully',
  EXPENSE_UPDATED: 'Expense updated successfully',
  EXPENSE_DELETED: 'Expense deleted',
};
