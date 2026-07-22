import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Analytics from './components/Analytics';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ReceiptScanner from './components/ReceiptScanner';
import { LayoutDashboard, Camera, PlusCircle, History } from 'lucide-react';

export default function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 flex justify-center items-center p-0 sm:p-4">
          {/* Mobile App Container */}
          <div className="w-full max-w-sm bg-slate-50 h-screen sm:h-[800px] sm:rounded-[40px] sm:shadow-2xl sm:border-[6px] sm:border-slate-800 flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <header className="p-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center">
              <div>
                <h1 className="text-base font-extrabold text-slate-900">FinTrack AI</h1>
                <p className="text-[10px] text-slate-400 font-medium">Smart OCR Expense Assistant</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </header>

            {/* Interconnected Webpages (Routes) */}
            <main className="p-4 flex-1 overflow-y-auto pb-20">
              <Routes>
                {/* Page 1: Dashboard / Overview */}
                <Route path="/" element={
                  <div className="space-y-4">
                    <Analytics />
                    <ExpenseList />
                  </div>
                } />

                {/* Page 2: OCR Scanner Webpage */}
                <Route path="/scan" element={
                  <div className="space-y-4 pt-2">
                    <ReceiptScanner />
                  </div>
                } />

                {/* Page 3: Manual Entry Webpage */}
                <Route path="/add" element={
                  <div className="space-y-4 pt-2">
                    <ExpenseForm />
                  </div>
                } />

                {/* Page 4: Full History Webpage */}
                <Route path="/history" element={
                  <div className="pt-2">
                    <ExpenseList />
                  </div>
                } />
              </Routes>
            </main>

            {/* Navigation Bar Linking the Pages */}
            <nav className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 p-2 px-4 flex justify-around items-center z-30">
              <NavLink 
                to="/" 
                className={({ isActive }) => `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[9px]">Dashboard</span>
              </NavLink>

              <NavLink 
                to="/scan" 
                className={({ isActive }) => `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400'}`}
              >
                <Camera className="w-5 h-5" />
                <span className="text-[9px]">OCR Scan</span>
              </NavLink>

              <NavLink 
                to="/add" 
                className={({ isActive }) => `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400'}`}
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-[9px]">Add New</span>
              </NavLink>

              <NavLink 
                to="/history" 
                className={({ isActive }) => `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400'}`}
              >
                <History className="w-5 h-5" />
                <span className="text-[9px]">History</span>
              </NavLink>
            </nav>

          </div>
        </div>
      </Router>
    </ExpenseProvider>
  );
}