import React from 'react';
import { Trash2, Receipt } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpenses();

  return (
    <div className="glass-card p-5 rounded-3xl shadow-sm border border-slate-100/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase">Recent Transactions</h3>
        </div>
        <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
          {expenses.length} Total
        </span>
      </div>
      
      {expenses.length === 0 ? (
        <div className="text-center py-10 space-y-1">
          <p className="text-xs font-medium text-slate-400">No activity yet</p>
          <p className="text-[10px] text-slate-300">Scan a bill or manually add an expense</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {expenses.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/60 hover:bg-slate-100/80 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs">
                  {item.category.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-semibold text-slate-500">
                      {item.category}
                    </span>
                    <span className="text-[9px] text-slate-400">• {item.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900">₹{item.amount}</span>
                <button 
                  onClick={() => deleteExpense(item.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}