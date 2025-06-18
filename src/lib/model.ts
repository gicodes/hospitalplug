import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../lib/db';

interface HospitalAttributes {
  id: string;
  firebaseUid: string;
  email: string;
  name?: string;
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
  public firebaseUid!: string;
  public email!: string;
  public name?: string;
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

Hospital.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firebaseUid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    contact: DataTypes.JSONB,
    address: DataTypes.JSONB,
    type: DataTypes.ARRAY(DataTypes.STRING),
    operations: DataTypes.JSONB,
    business: DataTypes.JSONB,
    documents: DataTypes.JSONB,
    onboardingStep: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {  // <-- Added
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEmailVerified: {   // <-- Added
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Hospital',
    tableName: 'hospitals',
  }
);

export default Hospital;