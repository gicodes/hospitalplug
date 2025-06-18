'use client';

import React, { useState } from 'react';
import styles from '../../../auth/page.module.css';
import { AltAuth } from '@/app/components/auth/login';

const UserRegister = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('User registration credentials:', { email });
  };

  return (
    <div className={styles.page}>
      <div className={styles.authHeader}>
        <h1>User Registration</h1>
        <p>Fill in and submit your details to create a profile</p>
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

          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name <span>*</span></label>
            <input
              type="text"
              id="fullName"
              placeholder="Nkechi Amina, Aminu"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password <span>*</span></label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              required
            />
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
  );
};

export default UserRegister;
