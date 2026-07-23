import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fintrack_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginWithGoogle = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userProfile = {
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        token: credentialResponse.credential,
      };
      setUser(userProfile);
      localStorage.setItem('fintrack_user', JSON.stringify(userProfile));
    } catch (err) {
      console.error('Failed to decode Google token:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fintrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);