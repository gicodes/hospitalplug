import { useState } from 'react';

export const useHospitalOnboarding = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setCode] = useState('');
  const [form, setForm] = useState<any>({
    basic: {},
    operations: {},
    business: {},
    documents: {},
  });

  return { step, setStep, email, setEmail, verificationCode, setCode, form, setForm };
};