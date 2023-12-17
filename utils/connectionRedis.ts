import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config()

const { REDIS_PASSWORD, REDIS_PORT,REDIS_HOST } = process.env;

export const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
    }
});