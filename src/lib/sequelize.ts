import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

export const connectDB = async () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false,
      }
    );
    
    return sequelize;
  }
};