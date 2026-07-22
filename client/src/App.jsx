import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Analytics from './components/Analytics';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ReceiptScanner from './components/ReceiptScanner';
import { LayoutDashboard, Camera, PlusCircle, History } from 'lucide-react';

// Modular Navigation Bar
function Navbar() {
  const navItems = [
    { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
    { to: '/scan', label: 'OCR Scan', Icon: Camera },
    { to: '/add', label: 'Add New', Icon: PlusCircle },
    { to: '/history', label: 'History', Icon: History },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 p-2 px-4 flex justify-around items-center z-30">
      {navItems.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
              isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-[9px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="min-h-[100dvh] bg-slate-900 flex justify-center items-center p-0 sm:p-4">
          {/* Mobile App Frame */}
          <div className="w-full max-w-md h-[100dvh] sm:h-[800px] sm:max-h-[90vh] sm:rounded-[40px] sm:shadow-2xl sm:border-[6px] sm:border-slate-800 flex flex-col relative overflow-hidden bg-slate-50">
            
            {/* Header */}
            <header className="p-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center shrink-0">
              <div>
                <h1 className="text-base font-extrabold text-slate-900">FinTrack AI</h1>
                <p className="text-[10px] text-slate-400 font-medium">Smart OCR Expense Assistant</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </header>

            {/* Main Content View */}
            <main className="p-4 flex-1 overflow-y-auto pb-24 space-y-3">
              <Routes>
                {/* Dashboard / Overview */}
                <Route
                  path="/"
                  element={
                    <div className="space-y-3">
                      <Analytics />
                      <ExpenseList />
                    </div>
                  }
                />

                {/* OCR Scanner */}
                <Route
                  path="/scan"
                  element={
                    <div className="pt-2">
                      <ReceiptScanner />
                    </div>
                  }
                />

                {/* Manual Entry */}
                <Route
                  path="/add"
                  element={
                    <div className="pt-2">
                      <ExpenseForm />
                    </div>
                  }
                />

                {/* Transaction History */}
                <Route
                  path="/history"
                  element={
                    <div className="pt-2">
                      <ExpenseList />
                    </div>
                  }
                />
              </Routes>
            </main>

            {/* Bottom Navigation */}
            <Navbar />

          </div>
        </div>
      </Router>
    </ExpenseProvider>
  );
}