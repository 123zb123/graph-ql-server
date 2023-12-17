"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntitiesByTypeAndUserName = exports.getEntitiesByEntityType = exports.getEntitiesByUserName = exports.storeOrUpdateObjects = exports.getFieldJSONfromRedis = exports.getJSONfromRedis = exports.saveJSONToRedis = exports.getArrayCredentials = exports.saveArrayCredentials = exports.getCredentials = exports.saveCredentials = void 0;
const chalk_1 = __importDefault(require("chalk"));
const connectionRedis_1 = require("../utils/connectionRedis");
// 1. set credentials
function saveCredentials(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `password:${username}`;
        try {
            yield connectionRedis_1.client.set(key, password);
            console.log(chalk_1.default.greenBright(`Credentials for ${username} saved successfully!`));
            return 'the password was saved successfully';
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.saveCredentials = saveCredentials;
// 2. get credentials
function getCredentials(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `password:${username}`;
        try {
            const password = yield connectionRedis_1.client.get(key);
            return `the password was get successfully, ${password}`;
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.getCredentials = getCredentials;
// 3. set array of credentials
function saveArrayCredentials(credentialsArray) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const multi = connectionRedis_1.client.multi();
            credentialsArray.forEach(([username, password]) => {
                multi.set(`password:${username}`, password);
            });
            return yield multi.exec();
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.saveArrayCredentials = saveArrayCredentials;
// 4. get array of credentials
function getArrayCredentials(usernames) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const multi = connectionRedis_1.client.multi();
            usernames.forEach((username) => {
                multi.get(`password:${username}`);
            });
            return yield multi.exec();
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.getArrayCredentials = getArrayCredentials;
// 5. save JSON to Redis
function saveJSONToRedis(key, jsonValue) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(jsonValue);
        const data = yield connectionRedis_1.client.json.set(key, '.', jsonValue);
        return data;
    });
}
exports.saveJSONToRedis = saveJSONToRedis;
// 6. get JSON from Redis
function getJSONfromRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield connectionRedis_1.client.json.get('myobj');
        return data;
    });
}
exports.getJSONfromRedis = getJSONfromRedis;
// 7. get feild from json
function getFieldJSONfromRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield connectionRedis_1.client.json.get('myobj', { path: '.key1', });
        return data;
    });
}
exports.getFieldJSONfromRedis = getFieldJSONfromRedis;
// first insert data from json
function saveOrUpdateToRedis(obj, ttlInSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `${obj.metadata.uuid}:${obj.creator}:${obj.entity_type}`;
        const existingData = yield connectionRedis_1.client.json.get(key);
        if (existingData) {
            const updatedData = Object.assign(Object.assign({}, existingData), obj);
            yield connectionRedis_1.client.json.set(key, '.', updatedData);
            yield connectionRedis_1.client.expire(key, 120);
        }
        else {
            yield connectionRedis_1.client.json.set(key, '.', obj);
            yield connectionRedis_1.client.expire(key, ttlInSeconds);
        }
    });
}
function storeOrUpdateObjects(data) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            yield saveOrUpdateToRedis(obj, 300);
        }
    });
}
exports.storeOrUpdateObjects = storeOrUpdateObjects;
// get entity from redis database
function getEntitiesByUserName(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const pattern = `*:${userName}:*`;
        const keys = yield connectionRedis_1.client.keys(pattern);
        const entities = yield Promise.all(keys.map(key => {
            connectionRedis_1.client.json.get(key);
            connectionRedis_1.client.expire(key, 120);
        }));
        return entities;
    });
}
exports.getEntitiesByUserName = getEntitiesByUserName;
function getEntitiesByEntityType(entityType) {
    return __awaiter(this, void 0, void 0, function* () {
        const pattern = `*:*:${entityType}`;
        const keys = yield connectionRedis_1.client.keys(pattern);
        const entities = yield Promise.all(keys.map(key => {
            connectionRedis_1.client.json.get(key);
            connectionRedis_1.client.expire(key, 120);
        }));
        return entities;
    });
}
exports.getEntitiesByEntityType = getEntitiesByEntityType;
function getEntitiesByTypeAndUserName(entityType, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const pattern = `*:${userName}:${entityType}`;
        const keys = yield connectionRedis_1.client.keys(pattern);
        const entities = yield Promise.all(keys.map(key => {
            connectionRedis_1.client.json.get(key);
            connectionRedis_1.client.expire(key, 120);
        }));
        return entities;
    });
}
exports.getEntitiesByTypeAndUserName = getEntitiesByTypeAndUserName;
