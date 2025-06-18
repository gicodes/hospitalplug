'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Step1 from '@/app/components/auth/hospital/authOTP';
import Step2 from '@/app/components/auth/hospital/basicInfo';
import Step3 from '@/app/components/auth/hospital/operations';
import Step456 from '@/app/components/auth/hospital/submit';

export default function HospitalOnboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const steps = ['Verify Email', 'Basic Info', 'Operations', 'Finish Setup',];

  return (
    <div className={styles.page}>
      <h2>Onboard an institution</h2>
      <p>Complete the steps below to activate your account</p>

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

      {step === 0 && (<Step1 onNext={next} form={form} setForm={setForm} />)}
      {step === 1 && (<Step2 onNext={next} form={form} setForm={setForm} />)}
      {step === 2 && <Step3 onBack={back} onNext={next} form={form} setForm={setForm} />}
      {step === 3 && <Step456 onBack={back} onNext={next} form={form} setForm={setForm} />}
    </div>
  );
}
