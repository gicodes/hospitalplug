import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  return () => {
    signOut({ callbackUrl: '/' });
    
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/');
  };
};
