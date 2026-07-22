import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

const API_URL = 'https://smartexpensetracker-api.vercel.app/api/expenses';

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  // Load saved budget from localStorage, or default to 0
  const [budget, setBudgetState] = useState(() => {
    const savedBudget = localStorage.getItem('app_budget');
    return savedBudget !== null ? Number(savedBudget) : 0;
  });

  // Function to set and persist budget
  const setBudget = (newBudget) => {
    const amount = Number(newBudget);
    setBudgetState(amount);
    localStorage.setItem('app_budget', amount);
  };

  // Fetch initial expenses from Vercel MongoDB API
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