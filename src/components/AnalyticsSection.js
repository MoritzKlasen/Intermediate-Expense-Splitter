import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import './AnalyticsSection.css';

function AnalyticsSection({ expenses, participants }) {
  // Calculate spending by participant
  const spendingByPerson = participants.map((person) => {
    const total = expenses
      .filter((exp) => exp.paidBy === person)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: person,
      value: total,
      amount: formatCurrency(total),
    };
  }).filter((item) => item.value > 0);

  // Calculate spending by category
  const spendingByCategory = {};
  expenses.forEach((exp) => {
    const category = exp.category || 'Other';
    if (!spendingByCategory[category]) {
      spendingByCategory[category] = 0;
    }
    spendingByCategory[category] += exp.amount;
  });

  const categoryData = Object.entries(spendingByCategory).map(([name, value]) => ({
    name,
    value,
    amount: formatCurrency(value),
  }));

  // Calculate average spending
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageSpent = participants.length > 0 ? totalSpent / participants.length : 0;

  // Color palette for charts
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
  ];

  if (expenses.length === 0) {
    return (
      <div className="analytics-section">
        <h2>Analytics</h2>
        <div className="empty-state">
          <p>No expenses to analyze yet. Add expenses to see analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-section">
      <h2>Analytics Dashboard</h2>

      <div className="analytics-stats">
        <div className="stat-card">
          <h4>Total Spent</h4>
          <p className="stat-value">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="stat-card">
          <h4>Transactions</h4>
          <p className="stat-value">{expenses.length}</p>
        </div>
        <div className="stat-card">
          <h4>Average per Person</h4>
          <p className="stat-value">{formatCurrency(averageSpent)}</p>
        </div>
        <div className="stat-card">
          <h4>Active Categories</h4>
          <p className="stat-value">{categoryData.length}</p>
        </div>
      </div>

      <div className="charts-container">
        {spendingByPerson.length > 0 && (
          <div className="chart-wrapper">
            <h3>Spending by Person</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingByPerson}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, amount }) => `${name}: ${amount}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {spendingByPerson.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {spendingByPerson.map((item, index) => (
                <div key={item.name} className="legend-item">
                  <span
                    className="legend-box"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span>{item.name}: {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {categoryData.length > 0 && (
          <div className="chart-wrapper">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-text-secondary)"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: `1px solid var(--color-border)`,
                    color: 'var(--color-text)',
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {categoryData.map((item) => (
                <div key={item.name} className="legend-item">
                  <span className="legend-box" style={{ backgroundColor: '#3B82F6' }} />
                  <span>{item.name}: {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="analytics-details">
        <h3>Summary</h3>
        <table className="details-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Total Spent</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {spendingByPerson.map((person) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.amount}</td>
                <td>{((person.value / totalSpent) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnalyticsSection;
