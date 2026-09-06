import { ApiError, type ValidationIssue } from '../errors';

export type JsonRecord = Record<string, unknown>;

export function expectObject(value: unknown): JsonRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ApiError(400, 'INVALID_BODY', 'Request body must be a JSON object.');
  }
  return value as JsonRecord;
}

export function requiredString(
  body: JsonRecord,
  field: string,
  options: { max?: number; min?: number } = {},
): string {
  const value = body[field];
  if (typeof value !== 'string' || !value.trim()) {
    throw validationError(field, `${field} is required.`);
  }
  const normalized = value.trim();
  const min = options.min ?? 1;
  const max = options.max ?? 10_000;
  if (normalized.length < min || normalized.length > max) {
    throw validationError(field, `${field} must be between ${min} and ${max} characters.`);
  }
  return normalized;
}

export function optionalString(
  body: JsonRecord,
  field: string,
  options: { max?: number } = {},
): string | null {
  const value = body[field];
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw validationError(field, `${field} must be text.`);
  const normalized = value.trim();
  const max = options.max ?? 10_000;
  if (normalized.length > max) throw validationError(field, `${field} must be at most ${max} characters.`);
  return normalized || null;
}

export function requiredEmail(body: JsonRecord, field = 'email'): string {
  const value = requiredString(body, field, { max: 254 }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw validationError(field, 'Enter a valid email address.');
  }
  return value;
}

export function optionalUrl(body: JsonRecord, field: string): string | null {
  const value = optionalString(body, field, { max: 2048 });
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('unsupported protocol');
  } catch {
    throw validationError(field, `${field} must be a valid http(s) URL.`);
  }
  return value;
}

export function enumValue<const T extends readonly string[]>(
  body: JsonRecord,
  field: string,
  allowed: T,
): T[number] {
  const value = requiredString(body, field, { max: 64 });
  if (!allowed.includes(value as T[number])) {
    throw validationError(field, `${field} must be one of: ${allowed.join(', ')}.`);
  }
  return value as T[number];
}

export function optionalEnumValue<const T extends readonly string[]>(
  body: JsonRecord,
  field: string,
  allowed: T,
): T[number] | null {
  const value = optionalString(body, field, { max: 64 });
  if (!value) return null;
  if (!allowed.includes(value as T[number])) {
    throw validationError(field, `${field} must be one of: ${allowed.join(', ')}.`);
  }
  return value as T[number];
}

export function stringArray(
  body: JsonRecord,
  field: string,
  options: { maxItems?: number; itemMax?: number; required?: boolean } = {},
): string[] {
  const value = body[field];
  if (value === undefined && !options.required) return [];
  if (!Array.isArray(value)) throw validationError(field, `${field} must be an array of text values.`);
  const maxItems = options.maxItems ?? 50;
  const itemMax = options.itemMax ?? 500;
  if (value.length > maxItems) throw validationError(field, `${field} can contain at most ${maxItems} items.`);
  const normalized = value.map((item, index) => {
    if (typeof item !== 'string' || !item.trim()) {
      throw validationError(`${field}[${index}]`, 'Each item must be non-empty text.');
    }
    const text = item.trim();
    if (text.length > itemMax) {
      throw validationError(`${field}[${index}]`, `Each item must be at most ${itemMax} characters.`);
    }
    return text;
  });
  if (options.required && normalized.length === 0) {
    throw validationError(field, `${field} must contain at least one item.`);
  }
  return normalized;
}

export function booleanValue(body: JsonRecord, field: string): boolean {
  const value = body[field];
  if (typeof value !== 'boolean') throw validationError(field, `${field} must be true or false.`);
  return value;
}

export function parsePagination(query: Record<string, string>): { limit: number; offset: number } {
  const rawLimit = Number.parseInt(query.limit ?? '25', 10);
  const rawOffset = Number.parseInt(query.offset ?? '0', 10);
  return {
    limit: Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 25,
    offset: Number.isFinite(rawOffset) ? Math.max(rawOffset, 0) : 0,
  };
}

export function validationError(field: string, message: string): ApiError {
  const issues: ValidationIssue[] = [{ field, message }];
  return new ApiError(422, 'VALIDATION_ERROR', 'One or more fields are invalid.', issues);
}
