'use client';

import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import useLogin from '@/app/hooks/useLogin';
import styles from '../../auth/page.module.css';
import React, { useEffect, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

interface LoginProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  profile?: string;
  buttonLabel?: string;
}

const googleAuth = () => {
  signIn('google',  {
    callbackUrl: '/'}).then(() => {
    Cookies.set('role', 'user');
  })
}

export const AltAuth = () => (
  <div className={styles.multiLoginOption}>
    <span>
      <hr/> Or sign in with <hr/>
    </span>
    <button 
      onClick={googleAuth} 
      className="btn-secondary"
    >
      <span> 
        <FcGoogle fill='inherit' /> Google 
      </span>
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
  
  const login = useLogin();

  useEffect(() => {
    const saved = localStorage.getItem('rememberMeData');
    if (saved) {
      const { email, password } = JSON.parse(saved);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ email, password });
    } else {
      await login({
        email,
        password,
        profile: profile ?? '',
        rememberMe,
        startLoading: () => {},
        stopLoading: () => {},
      });
    }
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