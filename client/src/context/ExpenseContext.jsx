import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();
const API_URL = 'https://smartexpensetracker-api.vercel.app/api/expenses';

export function ExpenseProvider({ children }) {
  // Load expenses initially from localStorage
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('app_expenses');
    return localData ? JSON.parse(localData) : [];
  });

  // Load budget initially from localStorage
  const [budget, setBudgetState] = useState(() => {
    const savedBudget = localStorage.getItem('app_budget');
    return savedBudget !== null ? Number(savedBudget) : 0;
  });

  // Sync expenses to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem('app_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Set budget and persist locally
  const setBudget = (newBudget) => {
    const amount = Number(newBudget);
    setBudgetState(amount);
    localStorage.setItem('app_budget', amount);
  };

  // Sync with MongoDB backend on initial mount
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
      console.warn('Backend API unreachable, using local storage fallback:', err);
    }
  };

  // Add Expense with unique ID enforcement
  const addExpense = async (expense) => {
    const newExpense = {
      id: expense.id || expense._id || crypto.randomUUID(), // Enforce unique ID
      title: expense.title || expense.description || 'Untitled Expense',
      amount: Number(expense.amount) || 0,
      category: expense.category || 'General',
      date: expense.date || new Date().toISOString().split('T')[0]
    };

    setExpenses((prev) => [newExpense, ...prev]);

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });
    } catch (err) {
      console.error('Error syncing expense to backend:', err);
    }
  };

  // Delete ONLY the targeted single expense
  const deleteExpense = async (idToDelete) => {
    if (!idToDelete) return;

    setExpenses((prev) =>
      prev.filter((item) => (item.id || item._id) !== idToDelete)
    );

    try {
      await fetch(`${API_URL}/${idToDelete}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Error deleting expense from backend:', err);
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