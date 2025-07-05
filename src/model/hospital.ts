import { Model, Optional } from 'sequelize';

interface HospitalAttributes {
  id: string;
  role: 'hospital' | 'staff';
  status?: 'active' | 'suspended';
  email: string;
  name?: string;
  password: string,
  contact?: {
    phone: string;
    email?: string;
    website?: string;
    whatsapp?: string;
  };
  address?: {
    country: string;
    state: string;
    lga?: string;
    street: string;
    city: string;
    zip: string;
  };
  type?:Array<'public' | 'private' | 'teaching' | 'clinic' | 'specialist'>;
  operations?: {
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
  business?:  {
    services?: string[];
    registrationNumber?: string;
    taxId?: string;
    rooms?: {
      type?: string;
      spec?: string;
      beds?: string | number;
      baths?: string | number;
      toilets?: string | number;
      price?: string | number;
      remarks?: string;
    }
  };
  bio?: string;
  rating?: number;
  reviews?: string[];
  image?: string;
  latitude?: unknown | number;
  longitude?: unknown | number;
  location?: unknown | unknown | undefined;
  distance?: number;
  onboardingStep?: number;
  isVerified: boolean;
  verificationCode?: string;
  isEmailVerified?: boolean;
  isSubscribed?: boolean;
  subscriptionPlan?: 'pro' | 'basic' | null;
  servicesOffered?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type HospitalCreationAttributes = Optional<HospitalAttributes,
  'id' | 'onboardingStep' | 'isVerified' | 'verificationCode' | 'isEmailVerified'
>;

class Hospital extends Model<HospitalAttributes, HospitalCreationAttributes> implements HospitalAttributes {
  public id!: string;
  public email!: string;
  public name?: string;
  public password!: string;
  public role!: 'hospital' | 'staff';
  public contact?: {
    phone: string;
    email?: string;
    website?: string;
    whatsapp?: string;
  }
  public address?:  {
    country: string;
    state: string;
    city: string;
    lga: string;
    street: string;
    zip: string;
  };
  public type?:  Array<'public' | 'private' | 'teaching' | 'clinic' | 'specialist'>;
  public operations?: {
    schedule: string;
    openingHours: string;
    serviceSpecialties: string[];
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
  public documents?: object | unknown;
  public business?: {
    services: string[];
    registrationNumber: string;
    taxId: string;
    rooms: {
      type: string;
      spec: string;
      beds: number;
      baths: number;
      toilets: number;
      price: string | number;
      remarks: string;
    }
  };
  public bio?: string;
  public rating?: number;
  public reviews?: string[];
  public image?: string;
  public status?: 'suspended' | 'active';
  public latitude?: unknown | number;
  public longitude?: unknown | number;
  public location?: unknown | unknown | undefined;
  public distance?: number | undefined;
  public onboardingStep!: number;
  public isVerified!: boolean;
  public verificationCode?: string; 
  public isEmailVerified?: boolean;
  public isSubscribed?: boolean;
  public subscriptionPlan?: 'pro' | 'basic' | null;
  public servicesOffered?: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Hospital;