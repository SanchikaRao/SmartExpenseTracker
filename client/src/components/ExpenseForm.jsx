import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseForm() {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({ title, amount: parseFloat(amount), category });
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-5 rounded-3xl shadow-sm border border-slate-100/80 space-y-3.5">
      <div className="flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-indigo-600" />
        <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase">Manual Expense Log</h3>
      </div>

      <div>
        <input 
          type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense title (e.g., Coffee, Books)" className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input 
          type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)" className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium transition-all"
        />
        <select 
          value={category} onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium text-slate-700"
        >
          <option>Food</option>
          <option>Entertainment</option>
          <option>Utilities</option>
          <option>Academics</option>
          <option>Others</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-2xl text-xs transition-all active:scale-[0.98] shadow-md">
        Save Transaction
      </button>
    </form>
  );
}