'use client';

import React, { useState } from 'react';
import styles from '../../auth/page.module.css';
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
    <button className="btn-secondary">
      <span><FcGoogle fill='inherit' /> Google</span>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
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
            <a href="#">Forgot password?</a>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} btn-primary`}
        >
          {buttonLabel}
        </button>

        { profile=="user" && <AltAuth />}

        <a href={`/auth/${profile}/register`} className={styles.authRedirect}>
          <p> Don&#39;t have an account? Sign up </p>
        </a>
      </form>
    </div>
  );
};

export default Login;