import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import './index.css';

// Paste your Client ID string copied from the downloaded JSON file
const GOOGLE_CLIENT_ID = "553063307824-nc0qfkqp7qj4tvkssqh0mp2qdnd1sgb4.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);