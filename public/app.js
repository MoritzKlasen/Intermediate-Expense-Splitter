let participants = [];
let expenses = [];

document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        participants = data.participants;
        expenses = data.expenses;
        
        renderParticipants();
        renderExpenses();
        updateBalances();
        updateParticipantSelects();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

async function addParticipant() {
    const input = document.getElementById('participantName');
    const name = input.value.trim();
    
    if (!name) {
        alert('Please enter a name');
        return;
    }
    
    try {
        const response = await fetch('/api/participants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        
        if (!response.ok) {
            const error = await response.json();
            alert(error.error);
            return;
        }
        
        const data = await response.json();
        participants = data.participants;
        input.value = '';
        
        renderParticipants();
        updateParticipantSelects();
    } catch (error) {
        console.error('Error adding participant:', error);
        alert('Failed to add participant');
    }
}

async function removeParticipant(name) {
    if (!confirm(`Remove ${name} from participants?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/participants/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        participants = data.participants;
        
        renderParticipants();
        updateParticipantSelects();
        updateBalances();
    } catch (error) {
        console.error('Error removing participant:', error);
        alert('Failed to remove participant');
    }
}

function renderParticipants() {
    const list = document.getElementById('participantsList');
    
    if (participants.length === 0) {
        list.innerHTML = '<p class="empty-message">No participants yet. Add some to get started!</p>';
        return;
    }
    
    list.innerHTML = participants.map(name => `
        <div class="participant-tag">
            ${name}
            <button class="remove-btn" onclick="removeParticipant('${name}')">×</button>
        </div>
    `).join('');
}

function updateParticipantSelects() {
    const paidBySelect = document.getElementById('paidBy');
    const splitAmongList = document.getElementById('splitAmongList');
    
    paidBySelect.innerHTML = '<option value="">Select person</option>' +
        participants.map(name => `<option value="${name}">${name}</option>`).join('');
    
    if (participants.length === 0) {
        splitAmongList.innerHTML = '<p class="empty-message">Add participants first</p>';
        return;
    }
    
    splitAmongList.innerHTML = participants.map(name => `
        <div class="checkbox-item">
            <input type="checkbox" id="split-${name}" value="${name}" checked>
            <label for="split-${name}">${name}</label>
        </div>
    `).join('');
}

async function addExpense(event) {
    event.preventDefault();
    
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const paidBy = document.getElementById('paidBy').value;
    
    const splitAmong = [];
    document.querySelectorAll('#splitAmongList input[type="checkbox"]:checked').forEach(checkbox => {
        splitAmong.push(checkbox.value);
    });
    
    if (!description || !amount || !paidBy || splitAmong.length === 0) {
        alert('Please fill in all fields and select at least one person to split among');
        return;
    }
    
    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount, paidBy, splitAmong })
        });
        
        if (!response.ok) {
            const error = await response.json();
            alert(error.error);
            return;
        }
        
        const data = await response.json();
        expenses.push(data.expense);
        
        document.getElementById('expenseForm').reset();
        updateParticipantSelects();
        
        renderExpenses();
        updateBalances();
    } catch (error) {
        console.error('Error adding expense:', error);
        alert('Failed to add expense');
    }
}

async function deleteExpense(id) {
    if (!confirm('Delete this expense?')) {
        return;
    }
    
    try {
        await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        expenses = expenses.filter(e => e.id !== id);
        
        renderExpenses();
        updateBalances();
    } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
    }
}

async function clearExpenses() {
    if (!confirm('Clear all expenses? This cannot be undone.')) {
        return;
    }
    
    try {
        await fetch('/api/clear', { method: 'POST' });
        expenses = [];
        
        renderExpenses();
        updateBalances();
    } catch (error) {
        console.error('Error clearing expenses:', error);
        alert('Failed to clear expenses');
    }
}

function renderExpenses() {
    const list = document.getElementById('expensesList');
    
    if (expenses.length === 0) {
        list.innerHTML = '<p class="empty-message">No expenses yet. Add your first expense above!</p>';
        return;
    }
    
    list.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <div class="expense-description">${expense.description}</div>
                <div class="expense-details">
                    Paid by ${expense.paidBy} • Split among ${expense.splitAmong.join(', ')}
                </div>
            </div>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        </div>
    `).join('');
}

async function updateBalances() {
    try {
        const response = await fetch('/api/balances');
        const data = await response.json();
        
        renderBalances(data.balances);
        renderSettlements(data.settlements);
    } catch (error) {
        console.error('Error updating balances:', error);
    }
}

function renderBalances(balances) {
    const list = document.getElementById('balancesList');
    
    if (Object.keys(balances).length === 0) {
        list.innerHTML = '<p class="empty-message">No balances to show yet</p>';
        return;
    }
    
    list.innerHTML = Object.entries(balances).map(([person, balance]) => {
        const absBalance = Math.abs(balance);
        let className = 'neutral';
        let prefix = '';
        
        if (balance > 0.01) {
            className = 'positive';
            prefix = '+';
        } else if (balance < -0.01) {
            className = 'negative';
        }
        
        return `
            <div class="balance-item">
                <div class="balance-name">${person}</div>
                <div class="balance-amount ${className}">${prefix}$${absBalance.toFixed(2)}</div>
            </div>
        `;
    }).join('');
}

function renderSettlements(settlements) {
    const list = document.getElementById('settlementsList');
    
    if (settlements.length === 0) {
        list.innerHTML = '<p class="empty-message">All settled up! 🎉</p>';
        return;
    }
    
    list.innerHTML = settlements.map(settlement => `
        <div class="settlement-item">
            <div class="settlement-text">
                ${settlement.from} pays ${settlement.to}
            </div>
            <div class="settlement-amount">$${settlement.amount.toFixed(2)}</div>
        </div>
    `).join('');
}
