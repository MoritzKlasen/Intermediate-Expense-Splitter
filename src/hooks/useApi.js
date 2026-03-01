import { useState, useCallback } from 'react';

export const useApi = (url, method = 'GET', body = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (customBody = null) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };

      if (customBody || body) {
        options.body = JSON.stringify(customBody || body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [url, method, body]);

  return { execute, loading, error };
};

export const useParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadParticipants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setParticipants(data.participants);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addParticipant = useCallback(async (name) => {
    const response = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setParticipants(data.participants);
    return data;
  }, []);

  const removeParticipant = useCallback(async (name) => {
    const response = await fetch(`/api/participants/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    setParticipants(data.participants);
    return data;
  }, []);

  return {
    participants,
    loading,
    loadParticipants,
    addParticipant,
    removeParticipant,
  };
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expense) => {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });

    const data = await response.json();
    setExpenses((prev) => [...prev, data.expense]);
    return data;
  }, []);

  const deleteExpense = useCallback(async (id) => {
    await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearExpenses = useCallback(async () => {
    await fetch('/api/clear', { method: 'POST' });
    setExpenses([]);
  }, []);

  return {
    expenses,
    loading,
    loadExpenses,
    addExpense,
    deleteExpense,
    clearExpenses,
  };
};

export const useBalances = () => {
  const [balances, setBalances] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBalances = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/balances');
      const data = await response.json();
      setBalances(data.balances);
      setSettlements(data.settlements);
    } catch (error) {
      console.error('Error loading balances:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    balances,
    settlements,
    loading,
    loadBalances,
  };
};
