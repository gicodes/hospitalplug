import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useAlert } from '@/contexts/alert-context';

export const useLogout = () => {
  const { showAlert } = useAlert();

  return async () => {
    try {
      await axios.post(`/api/auth/logout`);
    } catch (err) {
      console.warn('Logout error:', err);
      showAlert('error', "Failed to Logout");
    }

    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/;';
    document.cookie = 'role=; Max-Age=0; path=/;';

    signOut({ callbackUrl: '/' });
  };
};
