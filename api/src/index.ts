import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { ApiError } from './errors';
import { adminAuth } from './middleware/adminAuth';
import { configuredCors } from './middleware/cors';
import { requestId } from './middleware/requestId';
import { adminRoutes } from './routes/admin';
import { publicRoutes } from './routes/public';
import type { AppEnv } from './types';

const app = new Hono<AppEnv>();

app.use('*', requestId);
app.use('*', secureHeaders());
app.use('/api/*', configuredCors);
app.use('/api/*', logger());

app.get('/api/health', async (c) => {
  const result = await c.env.DB.prepare('SELECT 1 AS ok').first<{ ok: number }>();
  return c.json({ data: { service: 'george-sedra-api', status: result?.ok === 1 ? 'ok' : 'degraded', environment: c.env.APP_ENV ?? 'development' }, requestId: c.get('requestId') });
});

app.route('/api/v1', publicRoutes);
app.use('/api/v1/admin/*', adminAuth);
app.route('/api/v1/admin', adminRoutes);

app.notFound((c) => c.json({ error: { code: 'NOT_FOUND', message: 'API route not found.' }, requestId: c.get('requestId') }, 404));

app.onError((error, c) => {
  const requestIdValue = c.get('requestId');
  if (error instanceof ApiError) return c.json({ error: { code: error.code, message: error.message, ...(error.issues ? { issues: error.issues } : {}) }, requestId: requestIdValue }, error.status);
  console.error(`[${requestIdValue}] Unhandled API error`, error);
  return c.json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' }, requestId: requestIdValue }, 500);
});

export default app;
