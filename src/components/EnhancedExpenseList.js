import React, { useState } from 'react';
import { formatCurrency, formatDate, formatRelativeDate } from '../utils/formatters';
import { getCategoryById } from '../constants/categories';

function EnhancedExpenseList({ expenses, onDeleteExpense, onClearExpenses, onEditExpense }) {
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');

  const sortedExpenses = [...expenses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const filteredExpenses = filterCategory === 'all'
    ? sortedExpenses
    : sortedExpenses.filter(e => (e.category || 'other') === filterCategory);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'food', label: '🍽️ Food & Dining' },
    { id: 'transport', label: '🚗 Transport' },
    { id: 'entertainment', label: '🎬 Entertainment' },
    { id: 'utilities', label: '💡 Utilities' },
    { id: 'shopping', label: '🛍️ Shopping' },
    { id: 'health', label: '⚕️ Health' },
    { id: 'accommodation', label: '🏠 Accommodation' },
    { id: 'other', label: '📌 Other' },
  ];

  return (
    <section className="card">
      <div className="section-header">
        <h2>Expenses</h2>
        {expenses.length > 0 && (
          <button onClick={onClearExpenses} className="btn btn-danger btn-small">
            Clear All
          </button>
        )}
      </div>

      {expenses.length > 0 && (
        <div className="expense-filters">
          <div className="filter-group">
            <label htmlFor="sort-by">Sort</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="expenses-list">
        {filteredExpenses.length === 0 ? (
          <p className="empty-message">
            {expenses.length === 0
              ? 'No expenses yet. Create one to get started.'
              : 'No expenses match your filters.'}
          </p>
        ) : (
          filteredExpenses.map((expense) => {
            const category = getCategoryById(expense.category || 'other');
            return (
              <div key={expense.id} className="expense-item enhanced">
                <div className="expense-category-badge" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <div className="expense-info">
                  <div className="expense-header">
                    <div className="expense-description">{expense.description}</div>
                    <div className="expense-date">{formatRelativeDate(expense.date)}</div>
                  </div>
                  <div className="expense-details">
                    Paid by <strong>{expense.paidBy}</strong> • Split between {expense.splitAmong.join(', ')}
                  </div>
                </div>
                <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                <div className="expense-actions">
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteExpense(expense.id)}
                    title="Delete expense"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default EnhancedExpenseList;
