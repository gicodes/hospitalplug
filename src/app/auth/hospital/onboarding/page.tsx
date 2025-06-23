import { Suspense } from 'react';
import HospitalOnboardingClient from './suspender';

export default function HospitalOnboardingPage() {
  return (
    <Suspense fallback={<p>Loading onboarding...</p>}>
      <HospitalOnboardingClient />
    </Suspense>
  );
}