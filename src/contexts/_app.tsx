'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './auth-context';
import { AlertProvider } from './alert-context';
import { LoadingProvider } from './loading-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AlertProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </AlertProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
