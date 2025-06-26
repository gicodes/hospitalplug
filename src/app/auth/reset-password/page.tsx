'use client'

import axios from 'axios';
import React, { useState } from 'react'
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/contexts/alert-context';
import { useLoading } from '@/contexts/loading-context';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const ResetPasswordPage = () => {
  const { stopLoading } = useLoading();
  const { showAlert } = useAlert();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword!== confirmPassword) {
      showAlert("error", 'Passwords do not match!')
      return;
    }

    try {
      setIsLoading(true)

      const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`
      const searchParams = new URLSearchParams(window.location.search);
      
      const token = searchParams.get('token');
      if (!token) {
        showAlert("error", "Invalid or expired token session");
        setIsLoading(false);
        return;
      }

      const res = await axios.post(endpoint, { token, newPassword });
      const role = res.data.role;

      showAlert("success", "Password reset successful!");
      router.push(`/auth/${role}`)
    } catch (err) {
      showAlert("error", "Failed to reset password. Please try again!")
    } finally {
      stopLoading()
    }
  }
    
  return (
    <div className={styles.forgotPasswordPage}>
      <h2>Password Reset</h2>
      <div className={styles.emailInput}>
        <div className={styles.formGroup}>
          <div className={styles.formGroup2}>
            <label>New Password</label>
            <input
              type='text'
              placeholder='use a password you can remember'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup2}>
            <label>Re-type Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>

        <button className='btn-primary' onClick={handleSubmit}>
          {isLoading ? 'Resetting password...' : 'Set new password'}
        </button>
      </div>
    </div>
  )
}

export default ResetPasswordPage