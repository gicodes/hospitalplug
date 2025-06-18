'use client';

import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../../auth/page.module.css';

const HospitalRegister = () => {
  const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/hospital/register/request-code`, {
        email: email,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
    
    console.log('Hospital registration credentials:', { email });
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
