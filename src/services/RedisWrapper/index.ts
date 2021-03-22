import Redis, { Redis as IRedis } from "ioredis";

class RedisWrapper {
	private __redis: IRedis;

	private constructor(redisUrl: string) {
		this.__redis = new Redis(redisUrl);
	}

	/**
	 *
	 * @param key is a string
	 * @param value can be any javascript primitive or object based type
	 * @param time optional parameter for expiry of key (seconds)
	 */
	public put<T>(key: string, value: T, time?: number) {
		if (process.env.NODE_ENV === "test") return undefined;
		const stringified = JSON.stringify(value);
		if (time) {
			return this.__redis.setex(key, time, stringified);
		}
		this.__redis.set(key, stringified);
	}

	/**
	 * returns a promise
	 * @param key is a string
	 * Throws error if key is not found
	 */
	public async get<T>(key: string): Promise<T> {
		return await new Promise((resolve, reject) => {
			if (process.env.NODE_ENV === "test")
				return reject(
					"Can not set to redis cache in testing environment"
				);
			this.__redis.get(key, (err, data) => {
				try {
					if (err || !data) reject();
					if (data) resolve(JSON.parse(data));
				} catch (e) {
					reject(`Key ${key} not found`);
				}
			});
		});
	}

	/**
	 * changes a previous key's TTL in redis
	 * @param key key in redis store
	 * @param time new TTL
	 */
	public updateTTL(key: string, time: number): void {
		if (process.env.NODE_ENV === "test") return undefined;
		this.__redis.expireat(key, time);
	}
}

export { RedisWrapper as Redis };
