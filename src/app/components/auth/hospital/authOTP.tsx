'use client';

import axios from 'axios';
import api from '@/lib/axios';
import React, { useState } from 'react'
import styles from '@/app/auth/hospital/onboarding/page.module.css';
import { OnboardingForm } from '@/app/auth/hospital/onboarding/page';

export interface StepProps {
  userEmail?: string;
  onVerified?: (token: string) => void;
  onWrongEmail?: () => void;
  onNext: () => void;
  onBack?: () => void;
  form: OnboardingForm;
  setForm: React.Dispatch<React.SetStateAction<OnboardingForm>>;
}

const VerifyOTP: React.FC<StepProps> = ({onNext, userEmail, onVerified, onWrongEmail }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const result = await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/hospital/register/verify-code`, {
        email: userEmail,
        code,
      });
      
      if (onVerified) onVerified(result.data?.token || '');

      onNext();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Verification failed');
      } else if (err instanceof Error) {
        setError(err.message || 'Verification failed');
      } else {
        setError('Verification failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className={styles.step0}>
      <p>
        We&#39;ve sent a verification code to {userEmail || "your e-mail address"}
      </p>
      <a href='/auth/hospital/register' onClick={onWrongEmail}>Incorrect email?</a>

      <div className={styles.OTPinput}>
        {[0, 1, 2, 3].map((idx) => (
          <input
            autoComplete="one-time-code"
            onFocus={(e) => e.target.select()}
            onPaste={(e) => {
              const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
              if (paste.length === 4) {
                setCode(paste);
                // Focus last input
                const last = document.getElementById('otp-input-3');
                if (last) (last as HTMLInputElement).focus();
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              const newCode = code.split('');
              newCode[idx] = val;
              setCode(newCode.join('').slice(0, 4));
              if (val && idx < 3) {
                const next = document.getElementById(`otp-input-${idx + 1}`);
                if (next) (next as HTMLInputElement).focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                if (code[idx]) {
                  // Remove current digit
                  const newCode = code.split('');
                  newCode[idx] = '';
                  setCode(newCode.join(''));
                } else if (idx > 0) {
                  // Move to previous input
                  const prev = document.getElementById(`otp-input-${idx - 1}`);
                  if (prev) (prev as HTMLInputElement).focus();
                  const newCode = code.split('');
                  newCode[idx - 1] = '';
                  setCode(newCode.join(''));
                  e.preventDefault();
                }
              }
            }}
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={code[idx] || ''}
            id={`otp-input-${idx}`}
            autoFocus={idx === 0}
          />
        ))}
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <button className='btn-primary p-2 fs-3' onClick={handleVerify} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </div>
    <div className={styles.minHeight}/>
    </>
  );
};

export default VerifyOTP;
