import { ApiError } from '../errors';

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const allowedTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export type StoredResume = {
  key: string;
  name: string;
  contentType: string;
  size: number;
};

export function validateResume(file: File): void {
  if (file.size > MAX_RESUME_BYTES) {
    throw new ApiError(413, 'RESUME_TOO_LARGE', 'Resume files must be 5 MB or smaller.');
  }
  if (!allowedTypes.has(file.type)) {
    throw new ApiError(415, 'UNSUPPORTED_RESUME_TYPE', 'Resume must be PDF, DOC, or DOCX.');
  }
}

export async function storeResume(bucket: R2Bucket, file: File): Promise<StoredResume> {
  validateResume(file);
  const extension = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : '';
  const key = `resumes/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${extension}`;
  const name = file.name.slice(0, 255);
  await bucket.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
    customMetadata: { originalName: name },
  });
  return { key, name, contentType: file.type, size: file.size };
}
