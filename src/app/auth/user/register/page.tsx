'use client';

import axios from 'axios';
import api from '@/lib/axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../auth/page.module.css';
import { useAlert } from '@/contexts/alert-context';
import { AltAuth } from '@/app/components/auth/login';
import { useLoading } from '@/contexts/loading-context';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const UserRegister = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password!== confirmPass) return;

    startLoading();
    
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/register`
      const res = await api.post(endpoint, { name, email, password });

      localStorage.setItem('token', res.data.token);

      showAlert('success', "Hi, Welcome to Hospital Plug!")
      router.push(`/dashboard/user`);
    } catch (err) {
      let message = 'Registration failed';

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

  return (
    <div className={styles.page}>
      <div className={styles.leftPane}>  
      </div>

      <div className={styles.userAuthPane}>
        <div className={styles.authHeader}>
          <h1>User Sign up</h1>
        </div>
        <div className={styles.registerContainer}>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address <span>*</span></label>
              <input
                type="email"
                id="email"
                placeholder={`user@example.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name <span>*</span></label>
              <input
                type="text"
                id="fullName"
                placeholder="Nkechi Amina, Aminu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password <span>*</span></label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                    placeholder="Enter a password"
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

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
              <div className={styles.passwordWrapper}>
                <input
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  type={showPassword ? "text" :"password"}
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

            <button
              type="submit"
              className={`${styles.submitButton} btn-primary`}
            >
              Submit 
            </button>

            <AltAuth />

            <a href={`/auth/user`} className={styles.authRedirect}>
              <p> Already have an account? Sign in</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
