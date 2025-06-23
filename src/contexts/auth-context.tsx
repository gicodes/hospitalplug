'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type Role = 'admin' | 'hospital' | 'user' | null;

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
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'authenticated') {
      const email = session?.user?.email;

      if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setRole('admin');
      } else if (pathname?.startsWith('/onboarding') || pathname?.startsWith('/dashboard/hospital')) {
        setRole('hospital');
      } else {
        setRole('user');
      }
    } else {
      setRole(null);
    }
  }, [session, status, pathname]);

  const value: AuthContextType = {
    user: session?.user || null,
    role,
    loading,
    isAuthenticated: status === 'authenticated',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
