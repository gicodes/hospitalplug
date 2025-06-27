import axios from 'axios';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/contexts/alert-context';
import { useAuth } from '@/contexts/auth-context';


const useLogin = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { refreshAuth } = useAuth();

  const handleLogin = async ({
    email,
    password,
    profile,
    rememberMe,
    startLoading,
    stopLoading,
  }: {
    email: string;
    password: string;
    profile: string;
    rememberMe: boolean;
    startLoading: () => void;
    stopLoading: () => void;
  }) => {
    try {
      startLoading();

      if (rememberMe) {
        localStorage.setItem('rememberMeData', JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem('rememberMeData');
      }

      const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${profile}`;
      await api.post(endpoint, { email, password });

      await refreshAuth();

      showAlert('success', 'Login Successful. Welcome Back!');
      router.push(`/dashboard/${profile}`);
    } catch (err) {
      let message = 'Login failed';

      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data?.message || err.response.statusText || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      showAlert('error', message);
    } finally {
      stopLoading();
    }
  };

  return handleLogin;
};

export default useLogin;
