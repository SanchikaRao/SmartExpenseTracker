import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();
const API_URL = 'https://smartexpensetracker-api.vercel.app/api/expenses';

export function ExpenseProvider({ children }) {
  // 1. Initialize expenses from localStorage so they never disappear on swipe
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('app_expenses');
    return localData ? JSON.parse(localData) : [];
  });

  // 2. Initialize budget from localStorage
  const [budget, setBudgetState] = useState(() => {
    const savedBudget = localStorage.getItem('app_budget');
    return savedBudget !== null ? Number(savedBudget) : 0;
  });

  // Keep localStorage continuously updated whenever expenses change
  useEffect(() => {
    localStorage.setItem('app_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Set budget and persist
  const setBudget = (newBudget) => {
    const amount = Number(newBudget);
    setBudgetState(amount);
    localStorage.setItem('app_budget', amount);
  };

  // Fetch live MongoDB expenses on load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setExpenses(data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch from MongoDB, using local cache:', err);
    }
  };

  const addExpense = async (expense) => {
    const newExpense = {
      title: expense.title || expense.description || 'Untitled Expense',
      description: expense.title || expense.description || 'Expense',
      amount: Number(expense.amount) || 0,
      category: expense.category || 'General',
      date: expense.date || new Date().toISOString().split('T')[0]
    };

    // Update local UI state immediately
    setExpenses((prev) => [newExpense, ...prev]);

    // Push to MongoDB
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });
      if (response.ok) {
        fetchExpenses(); // Refresh to sync MongoDB generated IDs
      }
    } catch (err) {
      console.error('Error saving to MongoDB:', err);
    }
  };

  const deleteExpense = async (id) => {
    setExpenses((prev) => prev.filter((item) => (item.id || item._id) !== id));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Error deleting from MongoDB:', err);
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