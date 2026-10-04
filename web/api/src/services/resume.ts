import { ApiError } from '../errors';

export const MAX_RESUME_BYTES = 1_000_000;
export const MAX_RESUME_BASE64_CHARS = 1_400_000;

const allowedTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export type Base64Resume = {
  name: string;
  contentType: string;
  size: number;
  base64: string;
};

function decodeBase64(value: string): Uint8Array {
  let binary: string;
  try {
    binary = atob(value);
  } catch {
    throw new ApiError(422, 'INVALID_RESUME_BASE64', 'Resume content must be valid base64.');
  }

  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function hasExpectedSignature(bytes: Uint8Array, contentType: string): boolean {
  if (contentType === 'application/pdf') {
    return bytes.length >= 5
      && bytes[0] === 0x25
      && bytes[1] === 0x50
      && bytes[2] === 0x44
      && bytes[3] === 0x46
      && bytes[4] === 0x2d;
  }

  if (contentType === 'application/msword') {
    const ole = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
    return bytes.length >= ole.length && ole.every((value, index) => bytes[index] === value);
  }

  if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return bytes.length >= 4
      && bytes[0] === 0x50
      && bytes[1] === 0x4b
      && bytes[2] === 0x03
      && bytes[3] === 0x04;
  }

  return false;
}

export function validateBase64Resume(input: {
  name: string;
  contentType: string;
  base64: string;
}): Base64Resume {
  const name = input.name.trim().slice(0, 255);
  const contentType = input.contentType.trim().toLowerCase();

  if (!name) {
    throw new ApiError(422, 'RESUME_NAME_REQUIRED', 'Resume file name is required.');
  }
  if (!allowedTypes.has(contentType)) {
    throw new ApiError(415, 'UNSUPPORTED_RESUME_TYPE', 'Resume must be PDF, DOC, or DOCX.');
  }

  let base64 = input.base64.trim();
  const dataUrl = /^data:([^;]+);base64,(.+)$/s.exec(base64);
  if (dataUrl) {
    const dataUrlType = dataUrl[1].trim().toLowerCase();
    if (dataUrlType !== contentType) {
      throw new ApiError(422, 'RESUME_TYPE_MISMATCH', 'Resume content type does not match its base64 data URL.');
    }
    base64 = dataUrl[2];
  }

  base64 = base64.replace(/\s+/g, '');
  if (!base64 || base64.length > MAX_RESUME_BASE64_CHARS) {
    throw new ApiError(413, 'RESUME_TOO_LARGE', 'Resume files must be 1 MB or smaller.');
  }
  if (base64.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new ApiError(422, 'INVALID_RESUME_BASE64', 'Resume content must be valid base64.');
  }

  const bytes = decodeBase64(base64);
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_RESUME_BYTES) {
    throw new ApiError(413, 'RESUME_TOO_LARGE', 'Resume files must be 1 MB or smaller.');
  }
  if (!hasExpectedSignature(bytes, contentType)) {
    throw new ApiError(422, 'RESUME_CONTENT_MISMATCH', 'Resume content does not match the declared file type.');
  }

  return {
    name,
    contentType,
    size: bytes.byteLength,
    base64,
  };
}

export function resumeBase64ToBytes(base64: string): Uint8Array {
  return decodeBase64(base64);
}
