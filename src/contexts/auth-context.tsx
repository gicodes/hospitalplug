'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

type Role = 'admin' | 'hospital' | 'doctor' | 'user' | null;

interface AuthContextType {
  user: import('next-auth').User | null;
  role: Role;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<Role>(null);
  const loading = status === 'loading';

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const cookieRole = Cookies.get('role') as Role;

      if (cookieRole) {
        setRole(cookieRole);
      } else if (session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setRole('admin');
        Cookies.set('role', 'admin');
      } else {
        setRole('user');
        Cookies.set('role', 'user');
      }
    } else {
      setRole(null);
      Cookies.remove('role');
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{
        user: session?.user || null,
        role,
        loading,
        isAuthenticated: status === 'authenticated',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);