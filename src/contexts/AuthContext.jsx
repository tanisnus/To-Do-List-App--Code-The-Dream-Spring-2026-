import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- hook must live alongside provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const login = async (userEmail, password) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: 'include',
      };

      const res = await fetch('/api/users/logon', options);
      const data = await res.json();

      if (res.status === 200 && data.name && data.csrfToken) {
        setEmail(data.name);
        setToken(data.csrfToken);
        return { success: true };
      }

      return {
        success: false,
        error: 'Login failed. Check your email and password.',
      };
    } catch {
      return {
        success: false,
        error: 'Unable to log in. Please try again.',
      };
    }
  };

  const logout = async () => {
    if (!token) {
      setEmail('');
      setToken('');
      return { success: true };
    }

    try {
      const options = {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
      };
      const res = await fetch('/api/users/logoff', options);

      if (res.status === 200) {
        setEmail('');
        setToken('');
        return { success: true };
      }

      return { success: false, error: 'Unable to log out. Please try again.' };
    } catch {
      return { success: false, error: 'Unable to log out. Please try again.' };
    } finally {
      setEmail('');
      setToken('');
    }
  };

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
