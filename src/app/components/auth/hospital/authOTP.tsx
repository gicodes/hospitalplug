'use client';

import axios from 'axios';
import React, { useState } from 'react'
import styles from '@/app/auth/hospital/onboarding/page.module.css';


export interface StepProps {
  userEmail?: string;
  onVerified?: (token: string) => void;
  onWrongEmail?: () => void;
  onNext: () => void;
  onBack?: () => void;
  form: Record<string, unknown>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const VerifyOTP: React.FC<StepProps> = ({onNext, userEmail, onVerified, onWrongEmail }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
  try {
    setLoading(true);
    const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/hospital/verify-code`, {
      email: userEmail,
      code,
    });
    
    if (onVerified) {
      // token optional – depending on how you continue
      onVerified(result.data?.token || '');
    }

    onNext(); // move to Step 2
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
        We&#39;ve sent a verification code to {userEmail || "your e-mail address"}.{' '}
        <span className='txt-danger' onClick={onWrongEmail}>Wrong email?</span>
      </p>

      <div className={styles.OTPinput}>
        {[0, 1, 2, 3].map((idx) => (
          <input
        key={idx}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={code[idx] || ''}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, '');
          if (!val) return;
          const newCode = code.split('');
          newCode[idx] = val;
          setCode(newCode.join('').slice(0, 4));
          // UX: move to next input if not last
          if (val && idx < 3) {
            const next = document.getElementById(`otp-input-${idx + 1}`);
            if (next) (next as HTMLInputElement).focus();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            const prev = document.getElementById(`otp-input-${idx - 1}`);
            if (prev) (prev as HTMLInputElement).focus();
          }
        }}
        id={`otp-input-${idx}`}
        style={{
          width: '40px',
          height: '48px',
          fontSize: '2rem',
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: '6px',
          outline: 'none',
          background: '#fff',
        }}
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