import { createClient } from "redis";

const { REDIS_PASSWORD, REDIS_PORT,REDIS_HOST } = process.env;


export const client = createClient({
    password: "1234",
    socket: {
        host: REDIS_HOST,
        port: 6379
    }
});