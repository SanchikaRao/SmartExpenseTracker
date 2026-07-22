import React, { useState } from 'react';
import { useExpenses } from './context/ExpenseContext';

function App() {
  const { budget = 0, setBudget, totalSpent = 0, expenses = [], addExpense, deleteExpense } = useExpenses() || {};
  const remaining = budget - totalSpent;

  // Local state for the inline add expense form
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    if (addExpense) {
      addExpense({ title, amount: Number(amount), category });
    }
    setTitle('');
    setAmount('');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#0f172a', margin: '0 0 6px 0' }}>Smart Expense Tracker</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Manage your budget and track expenses</p>
      </header>

      {/* BUDGET & SUMMARY CARDS */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '18px' }}>
          <label htmlFor="budget-input" style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
            Set Monthly Budget (₹)
          </label>
          <input
            id="budget-input"
            type="number"
            placeholder="Type your budget..."
            value={budget === 0 ? '' : budget}
            onChange={(e) => setBudget && setBudget(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '280px',
              padding: '10px 12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <span style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '700' }}>TOTAL BUDGET</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#0c4a6e' }}>₹{Number(budget).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <span style={{ fontSize: '0.8rem', color: '#b91c1c', fontWeight: '700' }}>TOTAL SPENT</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#7f1d1d' }}>₹{Number(totalSpent).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '700' }}>REMAINING BALANCE</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#14532d' }}>₹{Number(remaining).toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* ADD EXPENSE FORM */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Add New Expense</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Expense title e.g. Lunch"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: '2', minWidth: '180px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ flex: '1', minWidth: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ flex: '1', minWidth: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Add Expense
          </button>
        </form>
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Recent Transactions</h3>
        {expenses.length === 0 ? (
          <p style={{ color: '#94a3b8', margin: 0 }}>No expenses added yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '8px 0', color: '#64748b' }}>Title</th>
                <th style={{ padding: '8px 0', color: '#64748b' }}>Category</th>
                <th style={{ padding: '8px 0', color: '#64748b', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '8px 0', color: '#64748b', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id || item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 0', fontWeight: '500' }}>{item.title || item.description}</td>
                  <td style={{ padding: '12px 0', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600', color: '#dc2626' }}>₹{item.amount}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>
                    <button
                      onClick={() => deleteExpense && deleteExpense(item.id || item._id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default App;