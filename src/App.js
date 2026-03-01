import React, { useState, useEffect } from 'react';
import ParticipantSection from './components/ParticipantSection';
import EnhancedExpenseForm from './components/EnhancedExpenseForm';
import EnhancedExpenseList from './components/EnhancedExpenseList';
import SummarySection from './components/SummarySection';
import BalanceSection from './components/BalanceSection';
import SettlementSection from './components/SettlementSection';
import TabNavigation from './components/TabNavigation';
import AnalyticsSection from './components/AnalyticsSection';
import ThemeToggle from './components/ThemeToggle';
import { useParticipants, useExpenses, useBalances } from './hooks/useApi';
import { validateParticipantName } from './utils/validation';
import './App.css';

function App() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  const { participants, addParticipant, removeParticipant, loadParticipants } = useParticipants();
  const { expenses, addExpense, deleteExpense, clearExpenses, loadExpenses } = useExpenses();
  const { balances, settlements, loadBalances } = useBalances();

  // Initial data load
  useEffect(() => {
    loadParticipants();
    loadExpenses();
    loadBalances();
  }, []);

  // Reload balances when expenses change
  useEffect(() => {
    loadBalances();
  }, [expenses]);

  const handleAddParticipant = async (name) => {
    setError('');
    const validation = validateParticipantName(name);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      await addParticipant(name);
      setSuccess('Participant added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveParticipant = async (name) => {
    if (!window.confirm(`Remove ${name}?`)) {
      return;
    }

    try {
      await removeParticipant(name);
      setSuccess(`${name} removed`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddExpense = async (expenseData) => {
    setError('');
    try {
      await addExpense(expenseData);
      setSuccess('Expense added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) {
      return;
    }

    try {
      await deleteExpense(id);
      setSuccess('Expense deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearExpenses = async () => {
    if (!window.confirm('Clear all expenses? This cannot be undone.')) {
      return;
    }

    try {
      await clearExpenses();
      setSuccess('All expenses cleared');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <ThemeToggle />
      
      <header>
        <h1>Expense Splitter</h1>
        <p className="subtitle">Split shared expenses fairly and transparently</p>
      </header>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      )}

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="tab-content">
        {activeTab === 'overview' && (
          <>
            <SummarySection expenses={expenses} participants={participants} />
            <ParticipantSection
              participants={participants}
              onAddParticipant={handleAddParticipant}
              onRemoveParticipant={handleRemoveParticipant}
            />
          </>
        )}

        {activeTab === 'expenses' && (
          <>
            <EnhancedExpenseForm
              participants={participants}
              onAddExpense={handleAddExpense}
            />
            <EnhancedExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              onClearExpenses={handleClearExpenses}
            />
          </>
        )}

        {activeTab === 'balances' && (
          <>
            <BalanceSection balances={balances} />
            <SettlementSection settlements={settlements} />
          </>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsSection expenses={expenses} participants={participants} />
        )}
      </div>

      <footer>
        <p>© 2026 Expense Splitter • Fair expense tracking for groups</p>
      </footer>
    </div>
  );
}

export default App;
