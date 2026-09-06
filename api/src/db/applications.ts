import type { ApplicationStatus } from '../types';
import type { ApplicationInput, ApplicationStatusUpdate } from '../validation/applications';

export type ApplicationRow = {
  id: string;
  job_id: string;
  job_title?: string;
  job_slug?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  portfolio_url: string | null;
  interest: string;
  experience: string;
  status: ApplicationStatus;
  resume_name: string | null;
  resume_key: string | null;
  resume_content_type: string | null;
  resume_size: number | null;
  consent_at: string;
  created_at: string;
  updated_at: string;
};

type HistoryRow = {
  id: string;
  from_status: ApplicationStatus | null;
  to_status: ApplicationStatus;
  note: string | null;
  changed_at: string;
};

function mapApplication(row: ApplicationRow) {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: row.job_title ?? null,
    jobSlug: row.job_slug ?? null,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    portfolio: row.portfolio_url,
    interest: row.interest,
    experience: row.experience,
    status: row.status,
    resume: row.resume_key ? {
      name: row.resume_name,
      contentType: row.resume_content_type,
      size: row.resume_size,
      available: true,
    } : null,
    consentAt: row.consent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createApplication(db: D1Database, input: ApplicationInput) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.batch([
    db.prepare(`INSERT INTO job_applications
      (id, job_id, first_name, last_name, email, phone, city, portfolio_url, interest, experience, status,
       resume_name, resume_key, resume_content_type, resume_size, consent_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        id,
        input.jobId,
        input.firstName,
        input.lastName,
        input.email,
        input.phone,
        input.city,
        input.portfolio,
        input.interest,
        input.experience,
        input.resumeName,
        input.resumeKey,
        input.resumeContentType,
        input.resumeSize,
        now,
        now,
        now,
      ),
    db.prepare(`INSERT INTO application_status_history
      (id, application_id, from_status, to_status, note, changed_at)
      VALUES (?, ?, NULL, 'submitted', NULL, ?)`)
      .bind(crypto.randomUUID(), id, now),
  ]);
  return getApplicationById(db, id);
}

export async function getApplicationById(db: D1Database, id: string) {
  const row = await db.prepare(`SELECT a.*, j.title AS job_title, j.slug AS job_slug
    FROM job_applications a JOIN jobs j ON j.id = a.job_id WHERE a.id = ? LIMIT 1`)
    .bind(id)
    .first<ApplicationRow>();
  return row ? mapApplication(row) : null;
}

export async function getApplicationDetail(db: D1Database, id: string) {
  const application = await getApplicationById(db, id);
  if (!application) return null;
  const result = await db.prepare(`SELECT id, from_status, to_status, note, changed_at
    FROM application_status_history WHERE application_id = ? ORDER BY changed_at ASC`)
    .bind(id)
    .all<HistoryRow>();
  return {
    ...application,
    statusHistory: (result.results ?? []).map((row) => ({
      id: row.id,
      fromStatus: row.from_status,
      toStatus: row.to_status,
      note: row.note,
      changedAt: row.changed_at,
    })),
  };
}

export async function listApplications(
  db: D1Database,
  options: { limit: number; offset: number; status?: ApplicationStatus | null; jobId?: string | null },
) {
  const clauses: string[] = [];
  const params: (string | number | null)[] = [];
  if (options.status) {
    clauses.push('a.status = ?');
    params.push(options.status);
  }
  if (options.jobId) {
    clauses.push('a.job_id = ?');
    params.push(options.jobId);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const [rowsResult, countResult] = await db.batch([
    db.prepare(`SELECT a.*, j.title AS job_title, j.slug AS job_slug
      FROM job_applications a JOIN jobs j ON j.id = a.job_id
      ${where} ORDER BY a.created_at DESC LIMIT ? OFFSET ?`).bind(...params, options.limit, options.offset),
    db.prepare(`SELECT COUNT(*) AS count FROM job_applications a ${where}`).bind(...params),
  ]);
  const rows = (rowsResult.results ?? []) as ApplicationRow[];
  const count = Number(((countResult.results?.[0] ?? { count: 0 }) as { count: number }).count ?? 0);
  return { applications: rows.map(mapApplication), total: count };
}

export async function updateApplicationStatus(db: D1Database, id: string, update: ApplicationStatusUpdate) {
  const existing = await db.prepare('SELECT status FROM job_applications WHERE id = ? LIMIT 1')
    .bind(id)
    .first<{ status: ApplicationStatus }>();
  if (!existing) return null;

  const now = new Date().toISOString();
  await db.batch([
    db.prepare('UPDATE job_applications SET status = ?, updated_at = ? WHERE id = ?')
      .bind(update.status, now, id),
    db.prepare(`INSERT INTO application_status_history
      (id, application_id, from_status, to_status, note, changed_at)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), id, existing.status, update.status, update.note, now),
  ]);
  return getApplicationDetail(db, id);
}

export async function getApplicationResumeMetadata(db: D1Database, id: string) {
  return db.prepare('SELECT resume_key, resume_name, resume_content_type FROM job_applications WHERE id = ? LIMIT 1')
    .bind(id)
    .first<{ resume_key: string | null; resume_name: string | null; resume_content_type: string | null }>();
}
