'use client'

import axios from 'axios';
import React, { useState } from 'react'
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/contexts/alert-context';
import { useLoading } from '@/contexts/loading-context';

const ForgotPasswordPage = () => {
  const { stopLoading } = useLoading();
  const { showAlert } = useAlert();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`
      const res = await axios.post(endpoint, { email });

      localStorage.setItem('token', res.data.token);
      const token = res.data.token;

      showAlert("success", "Redirecting to Reset Password");
      router.push(`/auth/reset-password?token=${token}`)
    } catch (err) {
      showAlert("error", "Failed to fetch user credentials")
    } finally {
      stopLoading()
    }
  }
    
  return (
    <div className={styles.forgotPasswordPage}>
      <h2>Forgot Password? Let us help</h2>
      <div className={styles.emailInput}>
        <div className={styles.formGroup}>
          <label>What&#39;s your email?</label>
          <input
            type='email'
            placeholder=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='btn-primary' onClick={handleSubmit}>
          {isLoading ? 'Submitting' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default ForgotPasswordPage