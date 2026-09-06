import type { RequestStatus } from '../types';
import type { ContactRequestInput, ProjectInquiryInput } from '../validation/requests';

export async function createContactRequest(db: D1Database, input: ContactRequestInput) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO contact_requests
    (id, name, email, phone, service, location, message, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`)
    .bind(id, input.name, input.email, input.phone, input.service, input.location, input.message, now, now)
    .run();
  return { id, status: 'new' as const, createdAt: now };
}

export async function createProjectInquiry(db: D1Database, input: ProjectInquiryInput) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO project_inquiries
    (id, contact_name, email, phone, service_line, sub_service, property_address, city, project_description, desired_timeline, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`)
    .bind(
      id,
      input.contactName,
      input.email,
      input.phone,
      input.serviceLine,
      input.subService,
      input.propertyAddress,
      input.city,
      input.projectDescription,
      input.desiredTimeline,
      now,
      now,
    )
    .run();
  return { id, status: 'new' as const, createdAt: now };
}

export async function listContactRequests(db: D1Database, limit: number, offset: number) {
  const [rowsResult, countResult] = await db.batch([
    db.prepare('SELECT * FROM contact_requests ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(limit, offset),
    db.prepare('SELECT COUNT(*) AS count FROM contact_requests'),
  ]);
  return {
    rows: rowsResult.results ?? [],
    total: Number(((countResult.results?.[0] ?? { count: 0 }) as { count: number }).count ?? 0),
  };
}

export async function listProjectInquiries(db: D1Database, limit: number, offset: number) {
  const [rowsResult, countResult] = await db.batch([
    db.prepare('SELECT * FROM project_inquiries ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(limit, offset),
    db.prepare('SELECT COUNT(*) AS count FROM project_inquiries'),
  ]);
  return {
    rows: rowsResult.results ?? [],
    total: Number(((countResult.results?.[0] ?? { count: 0 }) as { count: number }).count ?? 0),
  };
}

export async function updateContactRequestStatus(db: D1Database, id: string, status: RequestStatus) {
  const result = await db.prepare('UPDATE contact_requests SET status = ?, updated_at = ? WHERE id = ?')
    .bind(status, new Date().toISOString(), id)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export async function updateProjectInquiryStatus(db: D1Database, id: string, status: RequestStatus) {
  const result = await db.prepare('UPDATE project_inquiries SET status = ?, updated_at = ? WHERE id = ?')
    .bind(status, new Date().toISOString(), id)
    .run();
  return (result.meta.changes ?? 0) > 0;
}
