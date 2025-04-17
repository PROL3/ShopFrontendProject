import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { DOT_ENV_PATH } from './paths';

expand(config({ path: DOT_ENV_PATH }));

export const PORT: number = +(process.env.PORT ?? 3005);
export const REDIS_HOST: string = process.env.REDIS_HOST ?? 'localhost';
export const REDIS_PORT: number = +(process.env.REDIS_PORT ?? 6379);
// redis://username:password@localhost:6379
export const REDIS_URI: string = `redis://${REDIS_HOST}:${REDIS_PORT}`;

