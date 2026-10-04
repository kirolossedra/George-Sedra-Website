import type { Context } from 'hono';
import { ApiError } from './errors';
import type { AppEnv } from './types';

export function ok<T>(c: Context<AppEnv>, data: T, status: 200 | 201 = 200) {
  return c.json({ data, requestId: c.get('requestId') }, status);
}

export function paged<T>(c: Context<AppEnv>, data: T[], pagination: { limit: number; offset: number; total: number }) {
  return c.json({ data, pagination, requestId: c.get('requestId') });
}

export async function readJson(c: Context<AppEnv>): Promise<unknown> {
  try {
    return await c.req.json();
  } catch {
    throw new ApiError(400, 'INVALID_JSON', 'Request body must contain valid JSON.');
  }
}
