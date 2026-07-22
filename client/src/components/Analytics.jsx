import React from 'react';
import { Wallet, ArrowDownRight, TrendingUp, PiggyBank } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useExpenses } from '../context/ExpenseContext';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#64748b'];

export default function Analytics() {
  const { totalSpent = 0, budget = 25000, expenses = [] } = useExpenses() || {};
  const remaining = budget - totalSpent;
  const percentageUsed = Math.min((totalSpent / budget) * 100, 100);

  // Group expenses safely
  const categoryData = (expenses || []).reduce((acc, curr) => {
    if (!curr || !curr.category) return acc;
    const existing = acc.find((item) => item.name === curr.category);
    if (existing) {
      existing.value += Number(curr.amount || 0);
    } else {
      acc.push({ name: curr.category, value: Number(curr.amount || 0) });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Balance</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">₹{remaining.toLocaleString()}</h2>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/50">
            <Wallet className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800/80 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <PiggyBank className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Budget</p>
              <p className="text-xs font-bold text-slate-200">₹{budget.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
              <ArrowDownRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Spent</p>
              <p className="text-xs font-bold text-rose-400">₹{totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Utilization Bar */}
        <div className="mt-4 relative z-10">
          <div className="flex justify-between text-[11px] mb-1 font-medium text-slate-400">
            <span>Utilization</span>
            <span className={percentageUsed > 85 ? 'text-rose-400 font-bold' : 'text-slate-300'}>{percentageUsed.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${percentageUsed > 85 ? 'bg-rose-500' : 'bg-indigo-500'}`}
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Pie Breakdown Chart */}
      {categoryData.length > 0 && (
        <div className="glass-card p-5 rounded-3xl shadow-sm border border-slate-100/80">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-700 tracking-wide uppercase">Spending Breakdown</h4>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}