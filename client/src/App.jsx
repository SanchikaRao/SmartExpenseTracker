import React from 'react';
import { useExpenses } from './context/ExpenseContext';

// Import your sub-components (adjust filenames/paths if needed)
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';

function App() {
  const { budget = 0, setBudget, totalSpent = 0, expenses = [] } = useExpenses() || {};
  const remaining = budget - totalSpent;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* APP HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ color: '#0f172a', margin: '0 0 6px 0', fontSize: '2rem' }}>Smart Expense Tracker</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Track expenses, scan receipts, and manage your monthly budget</p>
      </header>

      {/* 1. BUDGET INPUT & SUMMARY CARDS */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '18px' }}>
          <label htmlFor="budget-input" style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#334155', fontSize: '0.95rem' }}>
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
              maxWidth: '300px',
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
            <span style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '700', letterSpacing: '0.5px' }}>TOTAL BUDGET</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#0c4a6e' }}>₹{Number(budget).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <span style={{ fontSize: '0.8rem', color: '#b91c1c', fontWeight: '700', letterSpacing: '0.5px' }}>TOTAL SPENT</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#7f1d1d' }}>₹{Number(totalSpent).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '700', letterSpacing: '0.5px' }}>REMAINING BALANCE</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#14532d' }}>₹{Number(remaining).toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* 2. ADD EXPENSE FORM */}
      <section style={{ marginBottom: '28px' }}>
        {ExpenseForm ? <ExpenseForm /> : null}
      </section>

      {/* 3. RECENT TRANSACTIONS LIST */}
      <section>
        {ExpenseList ? <ExpenseList /> : null}
      </section>

    </div>
  );
}

export default App;