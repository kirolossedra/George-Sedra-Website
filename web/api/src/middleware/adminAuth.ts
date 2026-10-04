import type { MiddlewareHandler } from 'hono';
import { ApiError } from '../errors';
import type { AppEnv } from '../types';

export const adminAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  const configuredToken = c.env.ADMIN_API_TOKEN;
  if (!configuredToken) {
    throw new ApiError(503, 'ADMIN_AUTH_NOT_CONFIGURED', 'Admin authentication is not configured for this environment.');
  }

  const authorization = c.req.header('authorization');
  const suppliedToken = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  if (!suppliedToken || suppliedToken !== configuredToken) {
    throw new ApiError(401, 'UNAUTHORIZED', 'A valid admin bearer token is required.');
  }

  await next();
};
