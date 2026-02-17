import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_NAME: z.string().min(1).default('my-node-service'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  DATABASE_httpUrl: z.url().optional(),
  REDIS_URL: z.httpUrl().optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const errors = result.error.issues
    .map(({ path, message }) => `  - ${path.join('.') || 'env'}: ${message}`)
    .join('\n');
  throw new Error(`Environment validation failed:\n${errors}`);
}

export const config = result.data;
export type Config = typeof config;
