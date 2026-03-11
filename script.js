let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const form = document.getElementById('transactionForm');
const transactionsList = document.getElementById('transactionsList');
const totalBalanceEl = document.getElementById('totalBalance');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const clearAllBtn = document.getElementById('clearAll');
const canvas = document.getElementById('expenseChart');
const ctx = canvas.getContext('2d');
const noDataMessage = document.getElementById('noDataMessage');

form.addEventListener('submit', addTransaction);
clearAllBtn.addEventListener('click', clearAllTransactions);

function addTransaction(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    
    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        type,
        date: new Date().toLocaleDateString()
    };
    
    transactions.unshift(transaction);
    saveTransactions();
    updateUI();
    form.reset();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateUI();
}

function clearAllTransactions() {
    if (transactions.length === 0) return;
    
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        saveTransactions();
        updateUI();
    }
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateUI() {
    updateSummary();
    renderTransactions();
    renderChart();
}

function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    totalBalanceEl.textContent = formatCurrency(balance);
    totalIncomeEl.textContent = formatCurrency(income);
    totalExpenseEl.textContent = formatCurrency(expense);
}

function renderTransactions() {
    if (transactions.length === 0) {
        transactionsList.innerHTML = '<p class="no-transactions">No transactions yet. Add your first one!</p>';
        return;
    }
    
    transactionsList.innerHTML = transactions.map(t => `
        <div class="transaction-item ${t.type}">
            <div class="transaction-info">
                <div class="transaction-description">${t.description}</div>
                <div class="transaction-category">${getCategoryIcon(t.category)} ${t.category} • ${t.date}</div>
            </div>
            <div class="transaction-amount ${t.type}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </div>
            <button class="btn-delete" onclick="deleteTransaction(${t.id})">✕</button>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        salary: '💼',
        freelance: '💻',
        investment: '📈',
        food: '🍔',
        transport: '🚗',
        entertainment: '🎬',
        shopping: '🛍️',
        bills: '📄',
        other: '📦'
    };
    return icons[category] || '📦';
}

function formatCurrency(amount) {
    return '$' + Math.abs(amount).toFixed(2);
}

function renderChart() {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) {
        noDataMessage.style.display = 'block';
        canvas.style.display = 'none';
        return;
    }
    
    noDataMessage.style.display = 'none';
    canvas.style.display = 'block';
    
    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = [
        '#ef4444', '#f59e0b', '#10b981', '#3b82f6', 
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
    ];
    
    drawPieChart(categories, amounts, colors);
}

function drawPieChart(labels, data, colors) {
    const total = data.reduce((sum, val) => sum + val, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        const middleAngle = currentAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(middleAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(middleAngle) * (radius * 0.7);
        
        const percentage = ((value / total) * 100).toFixed(1);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percentage}%`, textX, textY);
        
        currentAngle += sliceAngle;
    });
    
    const legendY = canvas.height - 60;
    const legendX = 20;
    
    labels.forEach((label, index) => {
        const x = legendX + (index % 2) * 150;
        const y = legendY + Math.floor(index / 2) * 25;
        
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(x, y, 15, 15);
        
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(label, x + 20, y + 12);
    });
}

canvas.width = 400;
canvas.height = 350;

updateUI();
