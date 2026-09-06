import { Hono } from 'hono';
import { ApiError } from '../errors';
import { archiveJob, createJob, getJobById, listAllJobs, updateJob } from '../db/jobs';
import {
  getApplicationDetail,
  getApplicationResumeMetadata,
  listApplications,
  updateApplicationStatus,
} from '../db/applications';
import {
  listContactRequests,
  listProjectInquiries,
  updateContactRequestStatus,
  updateProjectInquiryStatus,
} from '../db/requests';
import { ok, paged, readJson } from '../http';
import type { AppEnv, ApplicationStatus, JobStatus } from '../types';
import { parseApplicationStatusUpdate } from '../validation/applications';
import { expectObject, parsePagination } from '../validation/common';
import { parseCreateJob, parseUpdateJob } from '../validation/jobs';
import { parseRequestStatus } from '../validation/requests';

const applicationStatuses: ApplicationStatus[] = ['submitted', 'under_review', 'interview', 'offer', 'hired', 'declined', 'withdrawn'];
const jobStatuses: JobStatus[] = ['draft', 'published', 'closed', 'archived'];

export const adminRoutes = new Hono<AppEnv>();

adminRoutes.get('/jobs', async (c) => {
  const pagination = parsePagination(c.req.query());
  const rawStatus = c.req.query('status');
  const status = jobStatuses.includes(rawStatus as JobStatus) ? (rawStatus as JobStatus) : null;
  const result = await listAllJobs(c.env.DB, { ...pagination, status });
  return paged(c, result.jobs, { ...pagination, total: result.total });
});

adminRoutes.get('/jobs/:id', async (c) => {
  const job = await getJobById(c.env.DB, c.req.param('id'));
  if (!job) throw new ApiError(404, 'JOB_NOT_FOUND', 'Job posting not found.');
  return ok(c, job);
});

adminRoutes.post('/jobs', async (c) => {
  const input = parseCreateJob(await readJson(c));
  const job = await createJob(c.env.DB, input);
  return ok(c, job, 201);
});

adminRoutes.patch('/jobs/:id', async (c) => {
  const input = parseUpdateJob(await readJson(c));
  if (Object.keys(input).length === 0) throw new ApiError(400, 'EMPTY_UPDATE', 'Provide at least one field to update.');
  const job = await updateJob(c.env.DB, c.req.param('id'), input);
  if (!job) throw new ApiError(404, 'JOB_NOT_FOUND', 'Job posting not found.');
  return ok(c, job);
});

adminRoutes.delete('/jobs/:id', async (c) => {
  const archived = await archiveJob(c.env.DB, c.req.param('id'));
  if (!archived) throw new ApiError(404, 'JOB_NOT_FOUND', 'Job posting not found.');
  return ok(c, { archived: true });
});

adminRoutes.get('/applications', async (c) => {
  const pagination = parsePagination(c.req.query());
  const rawStatus = c.req.query('status');
  const status = applicationStatuses.includes(rawStatus as ApplicationStatus) ? (rawStatus as ApplicationStatus) : null;
  const result = await listApplications(c.env.DB, {
    ...pagination,
    status,
    jobId: c.req.query('jobId') || null,
  });
  return paged(c, result.applications, { ...pagination, total: result.total });
});

adminRoutes.get('/applications/:id', async (c) => {
  const application = await getApplicationDetail(c.env.DB, c.req.param('id'));
  if (!application) throw new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found.');
  return ok(c, application);
});

adminRoutes.patch('/applications/:id/status', async (c) => {
  const update = parseApplicationStatusUpdate(await readJson(c));
  const application = await updateApplicationStatus(c.env.DB, c.req.param('id'), update);
  if (!application) throw new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found.');
  return ok(c, application);
});

adminRoutes.get('/applications/:id/resume', async (c) => {
  if (!c.env.RESUMES) throw new ApiError(503, 'RESUME_STORAGE_NOT_CONFIGURED', 'Resume storage has not been linked yet.');
  const metadata = await getApplicationResumeMetadata(c.env.DB, c.req.param('id'));
  if (!metadata?.resume_key) throw new ApiError(404, 'RESUME_NOT_FOUND', 'No resume is attached to this application.');
  const object = await c.env.RESUMES.get(metadata.resume_key);
  if (!object) throw new ApiError(404, 'RESUME_NOT_FOUND', 'The resume file could not be found.');

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('content-type', metadata.resume_content_type || headers.get('content-type') || 'application/octet-stream');
  headers.set('content-disposition', `attachment; filename="${(metadata.resume_name || 'resume').replace(/["\\]/g, '_')}"`);
  headers.set('cache-control', 'private, no-store');
  return new Response(object.body, { headers });
});

adminRoutes.get('/contact-requests', async (c) => {
  const pagination = parsePagination(c.req.query());
  const result = await listContactRequests(c.env.DB, pagination.limit, pagination.offset);
  return paged(c, result.rows, { ...pagination, total: result.total });
});

adminRoutes.patch('/contact-requests/:id/status', async (c) => {
  const status = parseRequestStatus(await readJson(c));
  const updated = await updateContactRequestStatus(c.env.DB, c.req.param('id'), status);
  if (!updated) throw new ApiError(404, 'CONTACT_REQUEST_NOT_FOUND', 'Contact request not found.');
  return ok(c, { id: c.req.param('id'), status });
});

adminRoutes.get('/project-inquiries', async (c) => {
  const pagination = parsePagination(c.req.query());
  const result = await listProjectInquiries(c.env.DB, pagination.limit, pagination.offset);
  return paged(c, result.rows, { ...pagination, total: result.total });
});

adminRoutes.patch('/project-inquiries/:id/status', async (c) => {
  const body = expectObject(await readJson(c));
  const status = parseRequestStatus(body);
  const updated = await updateProjectInquiryStatus(c.env.DB, c.req.param('id'), status);
  if (!updated) throw new ApiError(404, 'PROJECT_INQUIRY_NOT_FOUND', 'Project inquiry not found.');
  return ok(c, { id: c.req.param('id'), status });
});
