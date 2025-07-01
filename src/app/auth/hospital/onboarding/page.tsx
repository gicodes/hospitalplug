import { Suspense } from 'react';
import HospitalOnboardingClient from './suspender';

export interface OnboardingForm {
  name: string;
  contact?: {
    phone: string;
    email?: string;
    website?: string;
    whatsapp?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  type: Array<'public' | 'private' | 'teaching' | 'clinic' | 'specialist'>;
  operations: {
    schedule?: string;
    openingHours?: string;
    serviceSpecialties?: string[];
    hasEmergency: boolean;
    hasAmbulance: boolean;
    hasFoodCanteen: boolean;
    securePremises: boolean;
    numberOfHealthWorkers: string;
    has247PowerSupply: boolean;
    hasSteadyWaterSupply: boolean;
    hashealthcareFacilities: boolean;
    modesOfPayments: Array<'cash' | 'card' | 'insurance' | 'mobileMoney'>;
  };
  documents?: object | unknown;
  business: {
    services: string[];
    registrationNumber: string;
    taxId: string;
    rooms: {
      type: string;
      spec: string;
      beds: string | number;
      baths: string | number;
      toilets: string | number;
      price: string | number;
      remarks: string;
    };
  };
  password?: string;
  confirmPassword?: string
}

export interface OnboardingData {
  email: string;
  data: OnboardingForm;
}

export default function HospitalOnboardingPage() {
  return (
    <Suspense fallback={<p>Loading onboarding...</p>}>
      <HospitalOnboardingClient />
    </Suspense>
  );
}
