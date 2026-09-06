import type { Department, EmploymentType, JobStatus, WorkMode } from '../types';
import {
  enumValue,
  expectObject,
  optionalEnumValue,
  optionalString,
  requiredString,
  stringArray,
  type JsonRecord,
} from './common';

const departments = ['engineering', 'environmental', 'real_estate', 'operations'] as const;
const employmentTypes = ['full_time', 'part_time', 'contract'] as const;
const workModes = ['onsite', 'hybrid', 'remote', 'field_office'] as const;
const statuses = ['draft', 'published', 'closed', 'archived'] as const;

export type CreateJobInput = {
  slug: string | null;
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
};

export type UpdateJobInput = Partial<CreateJobInput>;

export function parseCreateJob(value: unknown): CreateJobInput {
  const body = expectObject(value);
  return {
    slug: optionalString(body, 'slug', { max: 100 }),
    title: requiredString(body, 'title', { max: 140 }),
    department: enumValue(body, 'department', departments),
    location: requiredString(body, 'location', { max: 160 }),
    employmentType: enumValue(body, 'employmentType', employmentTypes),
    workMode: optionalEnumValue(body, 'workMode', workModes),
    summary: requiredString(body, 'summary', { max: 500 }),
    description: requiredString(body, 'description', { max: 12_000 }),
    responsibilities: stringArray(body, 'responsibilities', { maxItems: 40, itemMax: 600, required: true }),
    qualifications: stringArray(body, 'qualifications', { maxItems: 40, itemMax: 600, required: true }),
    status: enumValue(body, 'status', statuses),
  };
}

export function parseUpdateJob(value: unknown): UpdateJobInput {
  const body = expectObject(value);
  const output: UpdateJobInput = {};

  if ('slug' in body) output.slug = optionalString(body, 'slug', { max: 100 });
  if ('title' in body) output.title = requiredString(body, 'title', { max: 140 });
  if ('department' in body) output.department = enumValue(body, 'department', departments);
  if ('location' in body) output.location = requiredString(body, 'location', { max: 160 });
  if ('employmentType' in body) output.employmentType = enumValue(body, 'employmentType', employmentTypes);
  if ('workMode' in body) output.workMode = optionalEnumValue(body, 'workMode', workModes);
  if ('summary' in body) output.summary = requiredString(body, 'summary', { max: 500 });
  if ('description' in body) output.description = requiredString(body, 'description', { max: 12_000 });
  if ('responsibilities' in body) output.responsibilities = stringArray(body, 'responsibilities', { maxItems: 40, itemMax: 600, required: true });
  if ('qualifications' in body) output.qualifications = stringArray(body, 'qualifications', { maxItems: 40, itemMax: 600, required: true });
  if ('status' in body) output.status = enumValue(body, 'status', statuses);

  return output;
}

export function parseJobFilter(query: Record<string, string>) {
  const department = query.department;
  return {
    department: departments.includes(department as Department) ? (department as Department) : null,
  };
}

export function parseStatusUpdate(body: JsonRecord): JobStatus {
  return enumValue(body, 'status', statuses);
}
