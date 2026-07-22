import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

const API_URL = 'https://smartexpensetracker-api.vercel.app/api/expenses';

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(25000);

  // Fetch expenses from live API on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setExpenses(data);
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const addExpense = async (expense) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
      date: expense.date || new Date().toISOString().split('T')[0]
    };

    // Optimistic UI update
    setExpenses((prev) => [...prev, newExpense]);

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const deleteExpense = async (id) => {
    // Optimistic UI update
    setExpenses((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <ExpenseContext.Provider value={{ expenses, budget, setBudget, addExpense, deleteExpense, totalSpent }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);