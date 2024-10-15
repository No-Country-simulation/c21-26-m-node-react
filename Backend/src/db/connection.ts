import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const db_name : string = process.env.DB_NAME as string;
const db_username: string = process.env.DB_USERNAME as string;
const db_password: string = process.env.DB_PASSWORD as string;
const db_host: string = process.env.DB_HOST as string;

const sequelize = new Sequelize (db_name, db_username, db_password, {
    host : db_host,
    dialect : 'mysql'
});

export default sequelize;