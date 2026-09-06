import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { ApiError } from '../errors';
import { ok, readJson } from '../http';
import { createApplication } from '../db/applications';
import { getJobBySlug, listPublishedJobs } from '../db/jobs';
import { createContactRequest, createProjectInquiry } from '../db/requests';
import type { AppEnv } from '../types';
import { parseApplication } from '../validation/applications';
import { parseJobFilter } from '../validation/jobs';
import { parseContactRequest, parseProjectInquiry } from '../validation/requests';

export const publicRoutes = new Hono<AppEnv>();

publicRoutes.get('/jobs', async (c) => {
  const filter = parseJobFilter(c.req.query());
  const jobs = await listPublishedJobs(c.env.DB, filter.department);
  return ok(c, jobs);
});

publicRoutes.get('/jobs/:slug', async (c) => {
  const job = await getJobBySlug(c.env.DB, c.req.param('slug'), true);
  if (!job) throw new ApiError(404, 'JOB_NOT_FOUND', 'Job posting not found.');
  return ok(c, job);
});

publicRoutes.post(
  '/applications',
  bodyLimit({
    maxSize: 2 * 1024 * 1024,
    onError: (c) => c.json({
      error: { code: 'REQUEST_TOO_LARGE', message: 'Application requests must be 2 MB or smaller.' },
      requestId: c.get('requestId'),
    }, 413),
  }),
  async (c) => {
    const input = parseApplication(await readJson(c));

    const job = await c.env.DB.prepare("SELECT id FROM jobs WHERE (id = ? OR slug = ?) AND status = 'published' LIMIT 1")
      .bind(input.jobId, input.jobId)
      .first<{ id: string }>();
    if (!job) throw new ApiError(404, 'JOB_NOT_FOUND', 'The selected job is not currently open.');

    const application = await createApplication(c.env.DB, { ...input, jobId: job.id });
    if (!application) throw new ApiError(500, 'APPLICATION_CREATE_FAILED', 'Application could not be created.');

    return ok(c, {
      id: application.id,
      status: application.status,
      createdAt: application.createdAt,
    }, 201);
  },
);

publicRoutes.post('/contact-requests', async (c) => {
  const input = parseContactRequest(await readJson(c));
  const request = await createContactRequest(c.env.DB, input);
  return ok(c, request, 201);
});

publicRoutes.post('/project-inquiries', async (c) => {
  const input = parseProjectInquiry(await readJson(c));
  const inquiry = await createProjectInquiry(c.env.DB, input);
  return ok(c, inquiry, 201);
});
