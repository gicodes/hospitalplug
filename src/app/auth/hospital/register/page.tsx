'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../auth/page.module.css';
import { useAlert } from '@/contexts/alert-context';
import { useLoading } from '@/contexts/loading-context';

const HospitalRegister = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('Something went wrong');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      startLoading();
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/hospital/register/request-code`, {
        email: email,
      });

      showAlert('success', `OTP sent to ${email}`)
      router.push(`/auth/hospital/onboarding?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Verification failed');
      } else {
        setError('Verification failed');
      }
      showAlert('error', error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.authHeader}>
        <h1>Hospital Registration</h1>
        <p> healthcare institution? Register an account now</p>
      </div>

      <div className={styles.registerContainer}>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address <span>*</span></label>
            <input
              type="email"
              id="email"
              placeholder={`hospital@example.com`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} btn-primary`}
          >
            Send OTP to my email
          </button>
          <a href={`/auth/hospital`} className={styles.authRedirect}>
            <p> Already have an account? Sign in</p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegister;
