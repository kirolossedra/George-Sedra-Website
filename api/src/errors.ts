export type ValidationIssue = {
  field: string;
  message: string;
};

export class ApiError extends Error {
  readonly status: 400 | 401 | 403 | 404 | 409 | 413 | 415 | 422 | 500 | 503;
  readonly code: string;
  readonly issues?: ValidationIssue[];

  constructor(status: ApiError['status'], code: string, message: string, issues?: ValidationIssue[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}
