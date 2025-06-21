import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  return () => {
    signOut({ callbackUrl: '/' });  // For user (next-auth)
    
    localStorage.removeItem('token');  // For hospital or admin (custom)
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/');
  };
};
