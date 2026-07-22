import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function Analytics() {
  const { budget = 0, setBudget, totalSpent = 0 } = useExpenses() || {};
  const remaining = budget - totalSpent;

  return (
    <div className="space-y-2">
      {/* Compact Set Budget Box */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-2">
        <label htmlFor="budget" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
          Budget (₹):
        </label>
        <input
          id="budget"
          type="number"
          placeholder="e.g. 25000"
          value={budget === 0 ? '' : budget}
          onChange={(e) => setBudget && setBudget(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-right"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-indigo-50/70 p-2 rounded-xl border border-indigo-100/50 text-center">
          <p className="text-[8px] font-bold text-indigo-500 uppercase">Budget</p>
          <p className="text-xs font-extrabold text-indigo-950 mt-0.5">₹{Number(budget).toLocaleString()}</p>
        </div>

        <div className="bg-rose-50/70 p-2 rounded-xl border border-rose-100/50 text-center">
          <p className="text-[8px] font-bold text-rose-500 uppercase">Spent</p>
          <p className="text-xs font-extrabold text-rose-950 mt-0.5">₹{Number(totalSpent).toLocaleString()}</p>
        </div>

        <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-100/50 text-center">
          <p className="text-[8px] font-bold text-emerald-600 uppercase">Balance</p>
          <p className="text-xs font-extrabold text-emerald-950 mt-0.5">₹{Number(remaining).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}