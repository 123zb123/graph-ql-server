import chalk from "chalk";
import { client } from "../utils/connectionRedis";
import { EntitiesArray } from './types'

// 1. set credentials
export async function saveCredentials(username: string, password: string) {
    const key = `password:${username}`;
    try {
        await client.set(key, password);
        console.log(chalk.greenBright(`Credentials for ${username} saved successfully!`));
        return 'the password was saved successfully'
    } catch (error) {
        console.error(chalk.redBright("Error saving credentials:", error));
    }
}

// 2. get credentials
export async function getCredentials(username: string) {
    const key = `password:${username}`;
    try {
        const password = await client.get(key);
        return `the password was get successfully, ${password}`
    } catch (error) {
        console.error(chalk.redBright("Error saving credentials:", error));
    }
}

// 3. set array of credentials
export async function saveArrayCredentials(credentialsArray: [[string, string]]) {
    try {
        const multi = client.multi();
        credentialsArray.forEach(([username, password]) => {
            multi.set(`password:${username}`, password);
        });
        return await multi.exec();
    } catch (error) {
        console.error(chalk.redBright("Error saving credentials:", error));
    }
}

// 4. get array of credentials
export async function getArrayCredentials(usernames: string[]) {
    try {
        const multi = client.multi();
        usernames.forEach((username) => {
            multi.get(`password:${username}`);
        });
        return await multi.exec();
    } catch (error) {
        console.error(chalk.redBright("Error saving credentials:", error));
    }
}
interface SaveJson {
    key1: string;
    key2: string;
}
// 5. save JSON to Redis
export async function saveJSONToRedis(key: string, jsonValue: any) {
    console.log(jsonValue);
    const data = await client.json.set(key, '.', jsonValue as any);
    return data
}

// 6. get JSON from Redis
export async function getJSONfromRedis() {
    const data = await client.json.get('myobj')
    return data
}

// 7. get feild from json
export async function getFieldJSONfromRedis() {
    const data = await client.json.get('myobj', { path: '.key1', })
    return data
}

// first insert data from json
async function saveOrUpdateToRedis(obj: EntitiesArray, ttlInSeconds: number) {
    const key = `${obj.metadata.uuid}:${obj.creator}:${obj.entity_type}`;
    const existingData = await client.json.get(key);

    if (existingData) {
        const updatedData = { ...(existingData as EntitiesArray), ...obj };
        await client.json.set(key, '.', updatedData);
        await client.expire(key, 120);
    } else {
        await client.json.set(key, '.', obj);
        await client.expire(key, ttlInSeconds);
    }
}
export async function storeOrUpdateObjects(data: EntitiesArray[]) {
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        await saveOrUpdateToRedis(obj, 300);
    }
}

// get entity from redis database
export async function getEntitiesByUserName(userName: string) {
    const pattern = `*:${userName}:*`;
    const keys = await client.keys(pattern);
    const entities = await Promise.all(keys.map(key =>{ 
        client.json.get(key);
        client.expire(key, 120);
    }));

    return entities;
}

export async function getEntitiesByEntityType(entityType: string) {
    const pattern = `*:*:${entityType}`;
    const keys = await client.keys(pattern);
    const entities = await Promise.all(keys.map(key =>{ 
        client.json.get(key);
        client.expire(key, 120);
    }));
    return entities
}

export async function getEntitiesByTypeAndUserName(entityType: string, userName: string) {    
    const pattern = `*:${userName}:${entityType}`;
    const keys = await client.keys(pattern);
    const entities = await Promise.all(keys.map(key =>{ 
        client.json.get(key);
        client.expire(key, 120);
    }));

    return entities;
}



