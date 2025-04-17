import { createClient, RedisClientType } from 'redis';
import { REDIS_URI } from './environment-variables';

export interface IRedisConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    getClient(): RedisClientType;
}

export class RedisConnection implements IRedisConnection {
    private client: RedisClientType | null = null;
    // TODO: add logger later
    // private logger = new WinstonLogger('Redis');
    private static instance: RedisConnection;

    private constructor() { } // Make constructor private for singleton pattern

    async connect(): Promise<void> {
        try {
            this.client = createClient({
                url: REDIS_URI
            });

            // Set up error handling
            this.client.on('error', (error) => {
                console.error('Redis Client Error', error);
                // this.logger.error('Redis Client Error', error);
            });

            await this.client.connect();
            console.log('Connected to Redis');
            // this.logger.info('Connected to Redis');
        } catch (error) {
            console.error('Redis connection failed', error);
            // this.logger.error('Redis connection failed', error);
            throw error;
        }
    }

    static getInstance(): RedisConnection {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.quit();
            this.client = null;
            console.log('Disconnected from Redis');
            // this.logger.info('Disconnected from Redis');
        }
    }

    isConnected(): boolean {
        return this.client?.isOpen ?? false;
    }

    getClient(): RedisClientType {
        if (!this.client) throw new Error('RedisClient is not initialized');
        return this.client;
    }
}

// Export the singleton instance getter
export const getRedisConnection = RedisConnection.getInstance;
