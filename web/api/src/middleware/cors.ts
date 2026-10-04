import type { MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';
import type { AppEnv } from '../types';

export const configuredCors: MiddlewareHandler<AppEnv> = async (c, next) => {
  const configured = c.env.CORS_ORIGINS?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  const allowed = configured.length > 0 ? configured : ['http://localhost:5173'];
  const middleware = cors({
    origin: (origin) => allowed.includes(origin) ? origin : '',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key', 'X-Request-Id'],
    exposeHeaders: ['X-Request-Id'],
    maxAge: 86400,
    credentials: false,
  });
  return middleware(c, next);
};
