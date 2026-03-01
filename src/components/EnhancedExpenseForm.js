import React, { useState, useEffect } from 'react';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import { validateExpense } from '../utils/validation';

function EnhancedExpenseForm({ participants, onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [category, setCategory] = useState('other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [splitAmong, setSplitAmong] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const newSplitAmong = {};
    participants.forEach((name) => {
      newSplitAmong[name] = true;
    });
    setSplitAmong(newSplitAmong);
  }, [participants]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const selectedParticipants = Object.entries(splitAmong)
      .filter(([, isSelected]) => isSelected)
      .map(([name]) => name);

    const expenseData = {
      description,
      amount: parseFloat(amount),
      paidBy,
      category,
      date,
      splitAmong: selectedParticipants
    };

    const validation = validateExpense(expenseData);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onAddExpense(expenseData);

    setDescription('');
    setAmount('');
    setPaidBy('');
    setCategory('other');
    setDate(new Date().toISOString().split('T')[0]);
    const resetSplitAmong = {};
    participants.forEach((name) => {
      resetSplitAmong[name] = true;
    });
    setSplitAmong(resetSplitAmong);
  };

  const handleSplitAmongChange = (name) => {
    setSplitAmong({
      ...splitAmong,
      [name]: !splitAmong[name]
    });
  };

  return (
    <section className="card">
      <h2>Add Expense</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">What was this for?</label>
            <input
              id="description"
              type="text"
              placeholder="e.g., Dinner, Gas, Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="paidBy">Who paid?</label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              required
            >
              <option value="">Select person</option>
              {participants.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Split between</label>
          {participants.length === 0 ? (
            <p className="empty-message">Add participants first</p>
          ) : (
            <div className="checkbox-list">
              {participants.map((name) => (
                <div key={name} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`split-${name}`}
                    checked={splitAmong[name] || false}
                    onChange={() => handleSplitAmongChange(name)}
                  />
                  <label htmlFor={`split-${name}`}>{name}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Add Expense
        </button>
      </form>
    </section>
  );
}

export default EnhancedExpenseForm;
