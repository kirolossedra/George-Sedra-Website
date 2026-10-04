export function slugify(value: string): string {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 90) || 'job';
}

export async function uniqueJobSlug(db: D1Database, requested: string, excludeId?: string): Promise<string> {
  const base = slugify(requested);
  for (let suffix = 1; suffix <= 100; suffix += 1) {
    const candidate = suffix === 1 ? base : `${base}-${suffix}`;
    const statement = excludeId
      ? db.prepare('SELECT id FROM jobs WHERE slug = ? AND id <> ? LIMIT 1').bind(candidate, excludeId)
      : db.prepare('SELECT id FROM jobs WHERE slug = ? LIMIT 1').bind(candidate);
    const existing = await statement.first<{ id: string }>();
    if (!existing) return candidate;
  }
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}
