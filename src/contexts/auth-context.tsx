'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';

type Role = 'admin' | 'hospital' | 'doctor' | 'user' | null;

interface AuthContextType {
  user: import('next-auth').User | null;
  role: Role;
  loading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  isAuthenticated: false,
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const resolveAuth = useCallback(async () => {
    setLoading(true);
    try {
      if (status === 'authenticated' && session?.user) {
        setUser(session.user);
        setRole(session.user.role as Role || 'user');
      } else {
        const res = await fetch('/api/auth/me');
        const { user } = await res.json();

        if (user) {
          setUser(user);
          setRole(user.role as Role);
        } else {
          setUser(null);
          setRole(null);
        }
      }
    } catch (err) {
      console.error('Auth resolution failed:', err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    resolveAuth();
  }, [session, status, resolveAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAuthenticated: !!user && !!role && !loading,
        refreshAuth: resolveAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
