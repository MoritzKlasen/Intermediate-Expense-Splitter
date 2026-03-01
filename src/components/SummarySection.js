import React from 'react';
import { calculateTotalExpenses, calculateAverageExpense, getHighestExpense } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

function SummarySection({ expenses, participants }) {
  const totalExpenses = calculateTotalExpenses(expenses);
  const avgExpense = calculateAverageExpense(expenses);
  const highestExpense = getHighestExpense(expenses);

  const stats = [
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: '',
      color: '#3b82f6'
    },
    {
      label: 'Average Expense',
      value: formatCurrency(avgExpense),
      icon: '',
      color: '#06b6d4'
    },
    {
      label: 'Highest Expense',
      value: highestExpense ? formatCurrency(highestExpense.amount) : '$0.00',
      icon: '',
      color: '#ef4444'
    },
    {
      label: 'Total Participants',
      value: participants.length,
      icon: '',
      color: '#8b5cf6'
    }
  ];

  return (
    <section className="card">
      <h2>Summary</h2>
      <div className="summary-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummarySection;
