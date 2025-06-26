'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/page.module.css';
import { useAlert } from '@/contexts/alert-context';
import { useLoading } from '@/contexts/loading-context';
import { FcGoogle } from 'react-icons/fc';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

interface LoginProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  profile?: string;
  buttonLabel?: string;
}

export const AltAuth = () => (
  <div className={styles.multiLoginOption}>
    <span>
      <hr/> Or sign in with <hr/>
    </span>
    <button onClick={() => signIn('google')} className="btn-secondary" >
      <span> <FcGoogle fill='inherit' /> Google </span>
    </button>
  </div>
)

const Login: React.FC<LoginProps> = ({
  onSubmit,
  profile,
  buttonLabel = "Sign In",
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();

   useEffect(() => {
    const saved = localStorage.getItem('rememberMeData');
    if (saved) {
      const { email, password } = JSON.parse(saved);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      startLoading();

      if (rememberMe) {
        localStorage.setItem('rememberMeData', JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem('rememberMeData');
      }

      const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${profile}`
      const res = await axios.post(endpoint, { email, password });

      localStorage.setItem('token', res.data.token);

      showAlert('success', "Login Successful. Welcome Back!")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ email, password });
    } else await handleLogin();
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address <span>*</span></label>
          <input
            type="email"
            id="email"
            placeholder={`${profile}@example.com`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password <span>*</span></label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>

        <div className={styles.manageSetPassword}>
          <div className={styles.rememberMe}>
            <label htmlFor="rememberMe">Remember me</label>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="/auth/forgot-password">Forgot password?</a>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} btn-primary`}
        >
          {buttonLabel}
        </button>

        {profile=="user" && <AltAuth />}

        {profile !== 'admin' && (
          <a href={`/auth/${profile}/register`} className={styles.authRedirect}>
            <p> Don&#39;t have an account? Sign up </p>
          </a>
        )}
      </form>
    </div>
  );
};

export default Login;