import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function Analytics() {
  const { budget = 0, setBudget, totalSpent = 0 } = useExpenses() || {};
  const remaining = budget - totalSpent;

  return (
    <div className="space-y-3">
      {/* Set Monthly Budget Card */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
        <label htmlFor="budget" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Set Monthly Budget (₹)
        </label>
        <input
          id="budget"
          type="number"
          placeholder="Enter budget e.g. 25000"
          value={budget === 0 ? '' : budget}
          onChange={(e) => setBudget && setBudget(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
        />
      </div>

      {/* Summary Analytics Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-indigo-50/60 p-2.5 rounded-2xl border border-indigo-100/50">
          <p className="text-[9px] font-bold text-indigo-500 uppercase">Budget</p>
          <p className="text-sm font-extrabold text-indigo-950 mt-0.5">₹{Number(budget).toLocaleString()}</p>
        </div>

        <div className="bg-rose-50/60 p-2.5 rounded-2xl border border-rose-100/50">
          <p className="text-[9px] font-bold text-rose-500 uppercase">Spent</p>
          <p className="text-sm font-extrabold text-rose-950 mt-0.5">₹{Number(totalSpent).toLocaleString()}</p>
        </div>

        <div className="bg-emerald-50/60 p-2.5 rounded-2xl border border-emerald-100/50">
          <p className="text-[9px] font-bold text-emerald-600 uppercase">Balance</p>
          <p className="text-sm font-extrabold text-emerald-950 mt-0.5">₹{Number(remaining).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}