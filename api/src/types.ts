export type AppBindings = {
  DB: D1Database;
  ADMIN_API_TOKEN: string;
  CORS_ORIGINS?: string;
  RESUMES?: R2Bucket;
  APP_ENV?: 'development' | 'preview' | 'production';
};

export type AppVariables = { requestId: string };
export type AppEnv = { Bindings: AppBindings; Variables: AppVariables };
export type Department = 'engineering' | 'environmental' | 'real_estate' | 'operations';
export type EmploymentType = 'full_time' | 'part_time' | 'contract';
export type WorkMode = 'onsite' | 'hybrid' | 'remote' | 'field_office';
export type JobStatus = 'draft' | 'published' | 'closed' | 'archived';
export type ApplicationStatus = 'submitted' | 'under_review' | 'interview' | 'offer' | 'hired' | 'declined' | 'withdrawn';
export type RequestStatus = 'new' | 'in_progress' | 'waiting_on_client' | 'resolved' | 'archived';
export type ServiceLine = 'engineering' | 'environmental' | 'real_estate' | 'not_sure';
