import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const connectToDatabaseString : string | undefined = process.env.CONNECTION_STRING_DB 


export const sequelize = new Sequelize(connectToDatabaseString! ,{

    pool: {
        max: 1500,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
) 

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}