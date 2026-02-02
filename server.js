const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let expenses = [];
let participants = [];

app.get('/api/data', (req, res) => {
  res.json({ expenses, participants });
});

app.post('/api/participants', (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (participants.find(p => p.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'Participant already exists' });
  }
  
  participants.push(name);
  res.json({ participants });
});

app.delete('/api/participants/:name', (req, res) => {
  const { name } = req.params;
  participants = participants.filter(p => p !== name);
  res.json({ participants });
});

app.post('/api/expenses', (req, res) => {
  const { description, amount, paidBy, splitAmong } = req.body;
  
  if (!description || !amount || !paidBy || !splitAmong || splitAmong.length === 0) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const expense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    paidBy,
    splitAmong,
    date: new Date().toISOString()
  };
  
  expenses.push(expense);
  res.json({ expense });
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(e => e.id !== id);
  res.json({ success: true });
});

app.post('/api/clear', (req, res) => {
  expenses = [];
  res.json({ success: true });
});

app.get('/api/balances', (req, res) => {
  const balances = {};
  
  participants.forEach(person => {
    balances[person] = 0;
  });
  
  expenses.forEach(expense => {
    const { amount, paidBy, splitAmong } = expense;
    const splitAmount = amount / splitAmong.length;
    
    balances[paidBy] += amount;
    
    splitAmong.forEach(person => {
      balances[person] -= splitAmount;
    });
  });
  
  const settlements = calculateSettlements(balances);
  
  res.json({ balances, settlements });
});

function calculateSettlements(balances) {
  const settlements = [];
  const debtors = [];
  const creditors = [];
  
  for (const [person, balance] of Object.entries(balances)) {
    if (balance < -0.01) {
      debtors.push({ person, amount: -balance });
    } else if (balance > 0.01) {
      creditors.push({ person, amount: balance });
    }
  }
  
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const settleAmount = Math.min(debtor.amount, creditor.amount);
    
    settlements.push({
      from: debtor.person,
      to: creditor.person,
      amount: settleAmount
    });
    
    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;
    
    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }
  
  return settlements;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Expense Splitter running on http://localhost:${PORT}`);
});
