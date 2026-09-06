import type { ApplicationStatus } from '../types';
import { validateBase64Resume } from '../services/resume';
import {
  booleanValue,
  enumValue,
  expectObject,
  optionalString,
  optionalUrl,
  requiredEmail,
  requiredString,
  validationError,
} from './common';

const statuses = ['submitted', 'under_review', 'interview', 'offer', 'hired', 'declined', 'withdrawn'] as const;

export type ApplicationInput = {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  city: string | null;
  portfolio: string | null;
  interest: string;
  experience: string;
  consent: boolean;
  resumeName: string;
  resumeContentType: string;
  resumeSize: number;
  resumeBase64: string;
};

export type ApplicationStatusUpdate = {
  status: ApplicationStatus;
  note: string | null;
};

export function parseApplication(value: unknown): ApplicationInput {
  const body = expectObject(value);
  const consent = booleanValue(body, 'consent');
  if (!consent) {
    throw validationError('consent', 'Application consent must be accepted.');
  }

  const resume = validateBase64Resume({
    name: requiredString(body, 'resumeName', { max: 255 }),
    contentType: requiredString(body, 'resumeContentType', { max: 150 }),
    base64: requiredString(body, 'resumeBase64', { max: 1_400_000 }),
  });

  return {
    jobId: requiredString(body, 'jobId', { max: 100 }),
    firstName: requiredString(body, 'firstName', { max: 100 }),
    lastName: requiredString(body, 'lastName', { max: 100 }),
    email: requiredEmail(body),
    phone: optionalString(body, 'phone', { max: 50 }),
    city: optionalString(body, 'city', { max: 140 }),
    portfolio: optionalUrl(body, 'portfolio'),
    interest: requiredString(body, 'interest', { max: 5000 }),
    experience: requiredString(body, 'experience', { max: 7000 }),
    consent,
    resumeName: resume.name,
    resumeContentType: resume.contentType,
    resumeSize: resume.size,
    resumeBase64: resume.base64,
  };
}

export function parseApplicationStatusUpdate(value: unknown): ApplicationStatusUpdate {
  const body = expectObject(value);
  return {
    status: enumValue(body, 'status', statuses),
    note: optionalString(body, 'note', { max: 2000 }),
  };
}
