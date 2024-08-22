const expenseList = document.getElementById('expense-list');
const expenseSummary = document.getElementById('expense-summary');

const expenses = [];

document.getElementById('add-expense-btn').addEventListener('click', addExpense);

function addExpense() {
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;
    const description = document.getElementById('expense-description').value;

    if (amount && category && date) {
        const expense = { amount: parseFloat(amount), category, date, description };
        expenses.push(expense);
        renderExpenses();
        renderSummary();
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.date}: ${expense.category} - $${expense.amount.toFixed(2)} (${expense.description})
            <button onclick="deleteExpense(${index})">&times;</button>
        `;
        expenseList.appendChild(li);
    });
}

function renderSummary() {
    const summary = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    expenseSummary.innerHTML = '';
    for (const [category, total] of Object.entries(summary)) {
        const p = document.createElement('p');
        p.textContent = `${category}: $${total.toFixed(2)}`;
        expenseSummary.appendChild(p);
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
    renderSummary();
}

function clearForm() {
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = '';
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-description').value = '';
}
