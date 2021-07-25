import redis from 'redis';
import { promisify } from 'util';

import ConfigData from '../config/config';
import { logger } from './logger';

class Redis {

    private readonly redisClient: redis.RedisClient;
    private readonly setAsyncEx: (arg1: string, arg2: number, arg3 :string) => Promise <string>;
    private readonly getAsync: (arg1: string) => Promise < string | null >;

    constructor () {
        this.redisClient = redis.createClient({
            host: ConfigData.redis.host,
            port: ConfigData.redis.port
        });

        this.registerEventHandler();

        this.setAsyncEx = promisify(this.redisClient.setex).bind(this.redisClient);
        this.getAsync = promisify (this.redisClient.get).bind(this.redisClient);
    }

    /**
     * 
     */
    private registerEventHandler () {
        this.redisClient.on('error', err => {
            logger.error(err);
        });
    }

    /**
     * 
     * @param {string} key -
     * @param {any} value -
     * @param {number} ttlSeconds -
     * @returns 
     */
    public async saveResultWithTtl(key: string, value: any, ttlSeconds = 30) {
        return await this.setAsyncEx(key, ttlSeconds, JSON.stringify(value));
    }

    /**
     * 
     * @param {string} key - 
     * @returns
     */
    public async getResult (key: string) {
        const jsonString = await this.getAsync(key);

        if (jsonString) {
            return JSON.parse(JSON.parse(jsonString));
        }
    }
}

export default new Redis ();