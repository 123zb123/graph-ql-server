import { client } from "../utils/connectionRedis";

export async function redisCash(key: string) {
    const data = await client.json.get(key);    
    if (data) return data
    return null;
}