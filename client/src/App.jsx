import React from 'react';
import { useExpenses } from './context/ExpenseContext';

function App() {
  // Adding `|| {}` prevents destructuring errors if context is undefined
  const { budget = 0, setBudget, totalSpent = 0, expenses = [] } = useExpenses() || {};
  const remaining = budget - totalSpent;

  // ... rest of your App code

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Smart Expense Tracker</h1>

      {/* --- BUDGET INPUT & STATS HEADER --- */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="budget-input" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#334155' }}>
            Set Monthly Budget (₹)
          </label>
          <input
            id="budget-input"
            type="number"
            placeholder="Type your budget..."
            value={budget === 0 ? '' : budget}
            onChange={(e) => setBudget(e.target.value)}
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
            <span style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: '600' }}>TOTAL BUDGET</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#0c4a6e' }}>₹{Number(budget).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <span style={{ fontSize: '0.85rem', color: '#b91c1c', fontWeight: '600' }}>TOTAL SPENT</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#7f1d1d' }}>₹{Number(totalSpent).toLocaleString()}</h2>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <span style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: '600' }}>REMAINING BALANCE</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#14532d' }}>₹{Number(remaining).toLocaleString()}</h2>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;