import React from 'react';

interface AuthContextType {
  login: (userData: User) => void;
  logout: () => void;
  user: User | null;
}

interface User {
  role: 'admin' | 'hospital';
}

export const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  user: null
});