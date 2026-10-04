import type { RequestStatus, ServiceLine } from '../types';
import {
  enumValue,
  expectObject,
  optionalString,
  requiredEmail,
  requiredString,
} from './common';

const serviceLines = ['engineering', 'environmental', 'real_estate', 'not_sure'] as const;
const requestStatuses = ['new', 'in_progress', 'waiting_on_client', 'resolved', 'archived'] as const;

export type ContactRequestInput = {
  name: string;
  email: string;
  phone: string | null;
  service: ServiceLine;
  location: string | null;
  message: string;
};

export type ProjectInquiryInput = {
  contactName: string;
  email: string;
  phone: string | null;
  serviceLine: ServiceLine;
  subService: string | null;
  propertyAddress: string | null;
  city: string | null;
  projectDescription: string;
  desiredTimeline: string | null;
};

export function parseContactRequest(value: unknown): ContactRequestInput {
  const body = expectObject(value);
  return {
    name: requiredString(body, 'name', { max: 160 }),
    email: requiredEmail(body),
    phone: optionalString(body, 'phone', { max: 50 }),
    service: enumValue(body, 'service', serviceLines),
    location: optionalString(body, 'location', { max: 300 }),
    message: requiredString(body, 'message', { max: 7000 }),
  };
}

export function parseProjectInquiry(value: unknown): ProjectInquiryInput {
  const body = expectObject(value);
  return {
    contactName: requiredString(body, 'contactName', { max: 160 }),
    email: requiredEmail(body),
    phone: optionalString(body, 'phone', { max: 50 }),
    serviceLine: enumValue(body, 'serviceLine', serviceLines),
    subService: optionalString(body, 'subService', { max: 200 }),
    propertyAddress: optionalString(body, 'propertyAddress', { max: 300 }),
    city: optionalString(body, 'city', { max: 140 }),
    projectDescription: requiredString(body, 'projectDescription', { max: 10_000 }),
    desiredTimeline: optionalString(body, 'desiredTimeline', { max: 200 }),
  };
}

export function parseRequestStatus(value: unknown): RequestStatus {
  return enumValue(expectObject(value), 'status', requestStatuses);
}
