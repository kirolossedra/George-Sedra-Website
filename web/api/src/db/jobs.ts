import type { CreateJobInput, UpdateJobInput } from '../validation/jobs';
import { uniqueJobSlug } from '../services/slug';
import type { Department, EmploymentType, JobStatus, WorkMode } from '../types';

export type JobRow = {
  id: string;
  slug: string;
  title: string;
  department: Department;
  location: string;
  employment_type: EmploymentType;
  work_mode: WorkMode | null;
  summary: string;
  description: string;
  status: JobStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  department: Department;
  location: string;
  employmentType: EmploymentType;
  workMode: WorkMode | null;
  summary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type ChildRow = { job_id: string; content: string; position: number };

function mapRow(row: JobRow, responsibilities: string[], qualifications: string[]): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department,
    location: row.location,
    employmentType: row.employment_type,
    workMode: row.work_mode,
    summary: row.summary,
    description: row.description,
    responsibilities,
    qualifications,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

async function loadChildren(db: D1Database, ids: string[]) {
  if (ids.length === 0) {
    return { responsibilities: new Map<string, string[]>(), qualifications: new Map<string, string[]>() };
  }
  const placeholders = ids.map(() => '?').join(',');
  const [responsibilityResult, qualificationResult] = await db.batch([
    db.prepare(`SELECT job_id, content, position FROM job_responsibilities WHERE job_id IN (${placeholders}) ORDER BY job_id, position`).bind(...ids),
    db.prepare(`SELECT job_id, content, position FROM job_qualifications WHERE job_id IN (${placeholders}) ORDER BY job_id, position`).bind(...ids),
  ]);

  const responsibilities = groupChildren((responsibilityResult.results ?? []) as ChildRow[]);
  const qualifications = groupChildren((qualificationResult.results ?? []) as ChildRow[]);
  return { responsibilities, qualifications };
}

function groupChildren(rows: ChildRow[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>();
  for (const row of rows) {
    const values = grouped.get(row.job_id) ?? [];
    values.push(row.content);
    grouped.set(row.job_id, values);
  }
  return grouped;
}

export async function listPublishedJobs(db: D1Database, department: Department | null): Promise<Job[]> {
  const statement = department
    ? db.prepare("SELECT * FROM jobs WHERE status = 'published' AND department = ? ORDER BY published_at DESC, created_at DESC").bind(department)
    : db.prepare("SELECT * FROM jobs WHERE status = 'published' ORDER BY published_at DESC, created_at DESC");
  const result = await statement.all<JobRow>();
  const rows = result.results ?? [];
  const children = await loadChildren(db, rows.map((row) => row.id));
  return rows.map((row) => mapRow(row, children.responsibilities.get(row.id) ?? [], children.qualifications.get(row.id) ?? []));
}

export async function listAllJobs(
  db: D1Database,
  options: { limit: number; offset: number; status?: JobStatus | null },
): Promise<{ jobs: Job[]; total: number }> {
  const where = options.status ? 'WHERE status = ?' : '';
  const params = options.status ? [options.status] : [];
  const [jobsResult, countResult] = await db.batch([
    db.prepare(`SELECT * FROM jobs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).bind(...params, options.limit, options.offset),
    db.prepare(`SELECT COUNT(*) AS count FROM jobs ${where}`).bind(...params),
  ]);
  const rows = (jobsResult.results ?? []) as JobRow[];
  const countRow = (countResult.results?.[0] ?? { count: 0 }) as { count: number };
  const children = await loadChildren(db, rows.map((row) => row.id));
  return {
    jobs: rows.map((row) => mapRow(row, children.responsibilities.get(row.id) ?? [], children.qualifications.get(row.id) ?? [])),
    total: Number(countRow.count ?? 0),
  };
}

export async function getJobBySlug(db: D1Database, slug: string, publishedOnly: boolean): Promise<Job | null> {
  const statement = publishedOnly
    ? db.prepare("SELECT * FROM jobs WHERE slug = ? AND status = 'published' LIMIT 1").bind(slug)
    : db.prepare('SELECT * FROM jobs WHERE slug = ? LIMIT 1').bind(slug);
  const row = await statement.first<JobRow>();
  if (!row) return null;
  const children = await loadChildren(db, [row.id]);
  return mapRow(row, children.responsibilities.get(row.id) ?? [], children.qualifications.get(row.id) ?? []);
}

export async function getJobById(db: D1Database, id: string): Promise<Job | null> {
  const row = await db.prepare('SELECT * FROM jobs WHERE id = ? LIMIT 1').bind(id).first<JobRow>();
  if (!row) return null;
  const children = await loadChildren(db, [row.id]);
  return mapRow(row, children.responsibilities.get(row.id) ?? [], children.qualifications.get(row.id) ?? []);
}

function childStatements(db: D1Database, table: 'job_responsibilities' | 'job_qualifications', jobId: string, values: string[]) {
  return values.map((content, position) => db.prepare(`INSERT INTO ${table} (job_id, position, content) VALUES (?, ?, ?)`).bind(jobId, position, content));
}

export async function createJob(db: D1Database, input: CreateJobInput): Promise<Job> {
  const id = crypto.randomUUID();
  const slug = await uniqueJobSlug(db, input.slug ?? input.title);
  const now = new Date().toISOString();
  const publishedAt = input.status === 'published' ? now : null;
  const statements = [
    db.prepare(`INSERT INTO jobs
      (id, slug, title, department, location, employment_type, work_mode, summary, description, status, created_at, updated_at, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, slug, input.title, input.department, input.location, input.employmentType, input.workMode, input.summary, input.description, input.status, now, now, publishedAt),
    ...childStatements(db, 'job_responsibilities', id, input.responsibilities),
    ...childStatements(db, 'job_qualifications', id, input.qualifications),
  ];
  await db.batch(statements);
  return (await getJobById(db, id))!;
}

export async function updateJob(db: D1Database, id: string, input: UpdateJobInput): Promise<Job | null> {
  const existing = await getJobById(db, id);
  if (!existing) return null;

  const nextStatus = input.status ?? existing.status;
  const nextSlug = input.slug !== undefined || input.title !== undefined
    ? await uniqueJobSlug(db, input.slug ?? input.title ?? existing.slug, id)
    : existing.slug;
  const now = new Date().toISOString();
  const publishedAt = nextStatus === 'published'
    ? existing.status === 'published'
      ? existing.publishedAt ?? now
      : now
    : existing.publishedAt;

  const statements: D1PreparedStatement[] = [
    db.prepare(`UPDATE jobs SET
      slug = ?, title = ?, department = ?, location = ?, employment_type = ?, work_mode = ?, summary = ?, description = ?, status = ?, updated_at = ?, published_at = ?
      WHERE id = ?`)
      .bind(
        nextSlug,
        input.title ?? existing.title,
        input.department ?? existing.department,
        input.location ?? existing.location,
        input.employmentType ?? existing.employmentType,
        input.workMode !== undefined ? input.workMode : existing.workMode,
        input.summary ?? existing.summary,
        input.description ?? existing.description,
        nextStatus,
        now,
        publishedAt,
        id,
      ),
  ];

  if (input.responsibilities) {
    statements.push(db.prepare('DELETE FROM job_responsibilities WHERE job_id = ?').bind(id));
    statements.push(...childStatements(db, 'job_responsibilities', id, input.responsibilities));
  }
  if (input.qualifications) {
    statements.push(db.prepare('DELETE FROM job_qualifications WHERE job_id = ?').bind(id));
    statements.push(...childStatements(db, 'job_qualifications', id, input.qualifications));
  }

  await db.batch(statements);
  return getJobById(db, id);
}

export async function archiveJob(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare("UPDATE jobs SET status = 'archived', updated_at = ? WHERE id = ?")
    .bind(new Date().toISOString(), id)
    .run();
  return (result.meta.changes ?? 0) > 0;
}
