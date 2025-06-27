import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: string;
  role: 'user';
  email: string;
  name?: string;
  password?: string;
  image?: string;
  phone?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes, Optional<UserAttributes, 'id'>> implements UserAttributes {
  public id!: string;
  public role!: 'user';
  public email!: string;
  public name?: string;
  public password?: string;
  public image?: string;
  public phone?: string | number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export default User;