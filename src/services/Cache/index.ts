import * as redis from "redis";
import * as utils from "util";
import { REDIS_URL } from "../../utils";

const client = redis.createClient({
	url: REDIS_URL
});

client.on("error", (error) => {
	console.error("REDIS ERROR", error.message);
});

const _get = utils.promisify(client.get).bind(client);
const _set = utils.promisify(client.set).bind(client);
const _setTTL = utils.promisify(client.setex).bind(client);


export const set = async <T>(key: string, value: T) => {
	await _set(key, JSON.stringify(value));
};

export const setTTL = async <T>(key: string, value: T, seconds: number) => {
	await _setTTL(key, seconds, JSON.stringify(value));
};

export const get = async <T>(key: string): Promise<T> => {
	return JSON.parse(await _get(key));
};

export const getOrSetTTL = async <T>(key: string, TTL: number, cb: () => Promise<T>): Promise<T> => {
	let data = await get<T>(key);
	if (!data) {
		data = await cb();
		await setTTL(key, data, TTL);
	}
	return data;
}

export const getOrSet = async <T>(key: string, cb: () => Promise<T>): Promise<T> => {
	let data = await get<T>(key);
	if (!data) {
		data = await cb();
		await set(key, data);
	}
	return data;
}