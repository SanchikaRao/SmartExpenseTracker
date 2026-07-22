import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Trash2 } from 'lucide-react';

export default function ExpenseList() {
  const { expenses = [], deleteExpense } = useExpenses() || {};

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
        Recent Transactions
      </h3>

      {expenses.length === 0 ? (
        <p className="text-xs text-slate-400 py-2">No expenses recorded yet.</p>
      ) : (
        <div className="space-y-2">
          {expenses.map((item) => {
            const itemId = item.id || item._id; // Target correct unique ID

            return (
              <div
                key={itemId}
                className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100/80 hover:bg-slate-100/50 transition-all"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    {item.title || item.description || 'Expense'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {item.category} • {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-rose-600">
                    -₹{Number(item.amount).toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(itemId)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}