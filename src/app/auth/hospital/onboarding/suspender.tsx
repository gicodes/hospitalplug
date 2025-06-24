'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';

import Step1 from '@/app/components/auth/hospital/authOTP';
import Step2 from '@/app/components/auth/hospital/basicInfo';
import Step3 from '@/app/components/auth/hospital/operations';
import Step456End from '@/app/components/auth/hospital/submit';

export default function HospitalOnboarding() {
  const [step, setStep] = useState(2);
  const [form, setForm] = useState({});

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const steps = ['Verify Email', 'Basic Info', 'Operations', 'Finish Setup',];

  return (
    <div className={styles.page}>
      <h2> Onboard an institution </h2>
      <p> Complete the steps below to activate your account </p>

      <div className={styles.stepIndicator}>
        {steps.map((label, index) => (
          <div
            key={index}
            className={`${styles.stepDot} ${step === index ? styles.active : ''} ${step > index ? styles.completed : ''}`}
          >
            <span>{index + 1}</span>
            <p>{label}</p>
          </div>
        ))}
      </div>
      
      <>
        {step === 1 && (<Step1 userEmail={email ?? undefined} onNext={next} form={form} setForm={setForm} />)}
        {step === 2 && (<Step2 userEmail={email ?? undefined} onNext={next} form={form} setForm={setForm} />)}
        {step === 3 && (<Step3 userEmail={email ?? undefined} onBack={back} onNext={next} form={form} setForm={setForm} />)}
        {step === 4 && (<Step456End userEmail={email ?? undefined} onBack={back} onNext={next} form={form} setForm={setForm} />)}
      </>
    </div>
  );
}
