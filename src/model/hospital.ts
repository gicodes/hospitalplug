import { Model, Optional } from 'sequelize';

interface HospitalAttributes {
  id: string;
  role: 'admin' | 'hospital'| 'staff';
  email: string;
  name?: string;
  password: string,
  contact?: object;
  address?: object;
  type?: string[];
  operations?: object;
  business?: object;
  documents?: object;
  onboardingStep: number;
  verified: boolean;
  verificationCode?: string;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type HospitalCreationAttributes = Optional<
  HospitalAttributes,
  'id' | 'onboardingStep' | 'verified' | 'verificationCode' | 'isEmailVerified'
>;

class Hospital extends Model<HospitalAttributes, HospitalCreationAttributes> implements HospitalAttributes {
  public id!: string;
  public email!: string;
  public name?: string;
  public password!: string;
  public role!: 'admin' | 'hospital' | 'staff';
  public contact?: object;
  public address?: object;
  public type?: string[];
  public operations?: object;
  public business?: object;
  public documents?: object;
  public onboardingStep!: number;
  public verified!: boolean;
  public verificationCode?: string; // <-- Added
  public isEmailVerified?: boolean; // <-- Added
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Hospital;