let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let activeFilter = 'all';
let searchQuery = '';

// DOM refs
const form            = document.getElementById('transactionForm');
const transactionsList= document.getElementById('transactionsList');
const totalBalanceEl  = document.getElementById('totalBalance');
const totalIncomeEl   = document.getElementById('totalIncome');
const totalExpenseEl  = document.getElementById('totalExpense');
const clearAllBtn     = document.getElementById('clearAll');
const canvas          = document.getElementById('expenseChart');
const ctx             = canvas.getContext('2d');
const noDataMessage   = document.getElementById('noDataMessage');
const toastEl         = document.getElementById('toast');
const confirmModal    = document.getElementById('confirmModal');
const modalConfirm    = document.getElementById('modalConfirm');
const modalCancel     = document.getElementById('modalCancel');
const searchInput     = document.getElementById('searchInput');
const dateInput       = document.getElementById('date');

// Set today as default date
dateInput.value = new Date().toISOString().split('T')[0];

canvas.width  = 400;
canvas.height = 350;

// ── Toast ──────────────────────────────────────────
let toastTimer;
function showToast(message, type = 'info') {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.className = `toast ${type} show`;
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

// ── Modal ──────────────────────────────────────────
function showModal() {
    confirmModal.hidden = false;
    modalConfirm.focus();
}
function hideModal() {
    confirmModal.hidden = true;
}
modalCancel.addEventListener('click', hideModal);
confirmModal.addEventListener('click', e => { if (e.target === confirmModal) hideModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

modalConfirm.addEventListener('click', () => {
    transactions = [];
    saveTransactions();
    updateUI();
    hideModal();
    showToast('All transactions cleared', 'info');
});

// ── Form Validation ────────────────────────────────
function validateForm() {
    const desc   = document.getElementById('description');
    const amount = document.getElementById('amount');
    const cat    = document.getElementById('category');
    let valid = true;

    if (!desc.value.trim()) {
        document.getElementById('descError').textContent = 'Description is required';
        desc.classList.add('invalid');
        valid = false;
    } else {
        document.getElementById('descError').textContent = '';
        desc.classList.remove('invalid');
    }

    if (!amount.value || parseFloat(amount.value) <= 0) {
        document.getElementById('amtError').textContent = 'Enter a valid amount';
        amount.classList.add('invalid');
        valid = false;
    } else {
        document.getElementById('amtError').textContent = '';
        amount.classList.remove('invalid');
    }

    if (!cat.value) {
        valid = false;
        showToast('Please select a category', 'error');
    }

    return valid;
}

// ── Add Transaction ────────────────────────────────
form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    const description = document.getElementById('description').value.trim();
    const amount      = parseFloat(document.getElementById('amount').value);
    const category    = document.getElementById('category').value;
    const type        = document.querySelector('input[name="type"]:checked').value;
    const dateVal     = dateInput.value;
    const date        = dateVal
        ? new Date(dateVal).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })
        : new Date().toLocaleDateString();

    transactions.unshift({ id: Date.now(), description, amount, category, type, date });
    saveTransactions();
    updateUI();
    form.reset();
    dateInput.value = new Date().toISOString().split('T')[0];
    showToast(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`, 'success');
});

// ── Delete ─────────────────────────────────────────
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateUI();
    showToast('Transaction deleted', 'info');
}

// ── Clear All ──────────────────────────────────────
clearAllBtn.addEventListener('click', () => {
    if (transactions.length === 0) { showToast('No transactions to clear', 'info'); return; }
    showModal();
});

// ── Search & Filter ────────────────────────────────
searchInput.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderTransactions();
});

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeFilter = chip.dataset.filter;
        renderTransactions();
    });
});

// ── Save ───────────────────────────────────────────
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ── Update UI ──────────────────────────────────────
function updateUI() {
    updateSummary();
    renderTransactions();
    renderChart();
}

function updateSummary() {
    const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;

    totalBalanceEl.textContent = formatCurrency(balance);
    totalBalanceEl.className = 'balance-amount ' + (balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'zero');
    totalIncomeEl.textContent  = formatCurrency(income);
    totalExpenseEl.textContent = formatCurrency(expense);
}

// ── Render Transactions ────────────────────────────
function renderTransactions() {
    let filtered = transactions;

    if (activeFilter !== 'all') filtered = filtered.filter(t => t.type === activeFilter);
    if (searchQuery)            filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchQuery) ||
        t.category.toLowerCase().includes(searchQuery)
    );

    if (filtered.length === 0) {
        transactionsList.innerHTML = `
            <div class="empty-state">
                <span>${searchQuery || activeFilter !== 'all' ? '🔍' : '🧾'}</span>
                <p>${searchQuery || activeFilter !== 'all' ? 'No matching transactions found' : 'No transactions yet.<br>Add your first one!'}</p>
            </div>`;
        return;
    }

    transactionsList.innerHTML = filtered.map(t => `
        <div class="transaction-item ${t.type}">
            <div class="transaction-info">
                <div class="transaction-description">${escapeHtml(t.description)}</div>
                <div class="transaction-category">${getCategoryIcon(t.category)} ${t.category} • ${t.date}</div>
            </div>
            <div class="transaction-amount ${t.type}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </div>
            <button class="btn-delete" onclick="deleteTransaction(${t.id})" aria-label="Delete transaction">✕</button>
        </div>
    `).join('');
}

// ── Helpers ────────────────────────────────────────
function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getCategoryIcon(category) {
    const icons = { salary:'💼', freelance:'💻', investment:'📈', lent:'🤝', food:'🍔', transport:'🚗', entertainment:'🎬', shopping:'🛍️', bills:'📄', other:'📦' };
    return icons[category] || '📦';
}

function formatCurrency(amount) {
    return '₹' + Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Chart ──────────────────────────────────────────
function renderChart() {
    const expenses = transactions.filter(t => t.type === 'expense');

    if (expenses.length === 0) {
        noDataMessage.style.display = 'flex';
        canvas.style.display = 'none';
        return;
    }

    noDataMessage.style.display = 'none';
    canvas.style.display = 'block';

    const totals = {};
    expenses.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });

    const colors = ['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316'];
    drawPieChart(Object.keys(totals), Object.values(totals), colors);
}

function drawPieChart(labels, data, colors) {
    const total   = data.reduce((s, v) => s + v, 0);
    const cx      = canvas.width / 2;
    const cy      = canvas.height / 2;
    const radius  = Math.min(cx, cy) - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let angle = -Math.PI / 2;
    data.forEach((value, i) => {
        const slice = (value / total) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, angle, angle + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (slice > 0.2) {
            const mid = angle + slice / 2;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 13px Segoe UI, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${((value / total) * 100).toFixed(1)}%`, cx + Math.cos(mid) * radius * 0.68, cy + Math.sin(mid) * radius * 0.68);
        }

        angle += slice;
    });

    // Legend
    labels.forEach((label, i) => {
        const x = 20 + (i % 2) * 180;
        const y = canvas.height - 55 + Math.floor(i / 2) * 22;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x, y, 13, 13);
        ctx.fillStyle = '#334155';
        ctx.font = '12px Segoe UI, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x + 18, y + 7);
    });
}

updateUI();
