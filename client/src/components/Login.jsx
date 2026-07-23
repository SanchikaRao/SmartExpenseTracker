import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
        <ShieldCheck className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-extrabold text-slate-900">Sign in to FinTrack AI</h2>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          Authenticate securely with Google to isolate your personal budgets, expenses, and receipt scans.
        </p>
      </div>

      <div className="pt-2">
        <GoogleLogin
          onSuccess={loginWithGoogle}
          onError={() => alert('Google Sign-In failed. Please try again.')}
          shape="pill"
          theme="outline"
        />
      </div>
    </div>
  );
}