import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useLocalStorage('app_expenses', []);
  const [budget, setBudget] = useLocalStorage('app_budget', 25000);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: crypto.randomUUID(), date: expense.date || new Date().toISOString().split('T')[0] }
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <ExpenseContext.Provider value={{ expenses, budget, setBudget, addExpense, deleteExpense, totalSpent }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);