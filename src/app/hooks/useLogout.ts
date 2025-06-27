import { signOut } from 'next-auth/react';
import { useAlert } from '@/contexts/alert-context';

export const useLogout = () => {
  const { showAlert } = useAlert();

  return async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('token');
      document.cookie = 'token=; Max-Age=0; path=/;';
      document.cookie = 'role=; Max-Age=0; path=/;';
      document.cookie = 'email=; Max-Age=0; path=/;';

      signOut({ callbackUrl: '/' });
    } catch (err) {
      console.warn('Logout error:', err);
      showAlert('error', 'Failed to Logout');
    }
  };
};
