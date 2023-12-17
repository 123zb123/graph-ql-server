"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
const { REDIS_PASSWORD, REDIS_PORT, REDIS_HOST } = process.env;
exports.client = (0, redis_1.createClient)({
    password: "1234",
    socket: {
        host: REDIS_HOST,
        port: 6379
    }
});
