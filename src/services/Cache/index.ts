import * as Redis from "redis";
import * as utils from "util";
import { REDIS_URL } from "../../utils";

// instantiates the redis client
const client = Redis.createClient({
	url: REDIS_URL,
});

// console log error message if connections fail
client.on("error", (error: Redis.RedisError) => {
	console.error("REDIS ERROR", error.message);
});

// promisify the redis methods
const _get = utils.promisify(client.get).bind(client);
const _set = utils.promisify(client.set).bind(client);
const _setTTL = utils.promisify(client.setex).bind(client);

/**
 * Below methods provide an easy interface for the Redis functionality
 */

/**
 * Set a value permanently into the cache
 *
 * @param key string used to retrieve th evalue later
 * @param value Any value that can be JSON.stringified
 */
export const set = async <T>(key: string, value: T) => {
	await _set(key, JSON.stringify(value));
};

/**
 * Set a value into the cache for a specified amount
 * of time
 *
 * @param key string used to retrieve th evalue later
 * @param value Any value that can be JSON.stringified
 * @param seconds Time To Live (seconds) of the cache
 */
export const setTTL = async <T>(key: string, value: T, seconds: number) => {
	await _setTTL(key, seconds, JSON.stringify(value));
};

/**
 * Retrieves a value belonging to a certain key.
 *
 * Accepts a generic for the return type
 *
 * @param key key used to retrieve value
 */
export const get = async <T>(key: string): Promise<T> => {
	return JSON.parse(await _get(key));
};

/**
 *
 * Gets a value by key. If it does not exist in the
 * cache then it looks it up by calling the provided
 * call back, stores it in the cache for future use
 * and returns it.
 *
 * @param key the key used to retrieve value later
 * @param cb returns a promise of the item to store in cache if
 *    value is not found in the cache
 */
export const getOrSet = async <T>(
	key: string,
	cb: () => Promise<T>
): Promise<T> => {
	let data = await get<T>(key);
	if (!data) {
		data = await cb();
		await set(key, data);
	}
	return data;
};

/**
 *
 * Gets a value by key. If it does not exist in the
 * cache then it looks it up by calling the provided
 * call back, stores it in the cache for future use
 * and returns it.
 *
 * accepts a TTL parameter for the cache
 *
 * @param key the key used to retrieve value later
 * @param TTL the time to live field for cache
 * @param cb returns a promise of the item to store in cache if
 *    value is not found in the cache
 */
export const getOrSetTTL = async <T>(
	key: string,
	TTL: number,
	cb: () => Promise<T>
): Promise<T> => {
	let data = await get<T>(key);
	if (!data) {
		data = await cb();
		await setTTL(key, data, TTL);
	}
	return data;
};
