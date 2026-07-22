import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export const BudgetInput = () => {
  const { budget, setBudget } = useExpenses();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label 
        htmlFor="budget-input" 
        style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}
      >
        Set Monthly Budget (₹)
      </label>
      <input
        id="budget-input"
        type="number"
        value={budget === 0 ? '' : budget}
        placeholder="Enter monthly budget..."
        onChange={(e) => setBudget(e.target.value)}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          width: '100%',
          maxWidth: '300px'
        }}
      />
    </div>
  );
};