PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('engineering', 'environmental', 'real_estate', 'operations')),
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('full_time', 'part_time', 'contract')),
  work_mode TEXT CHECK (work_mode IS NULL OR work_mode IN ('onsite', 'hybrid', 'remote', 'field_office')),
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT
) STRICT;

CREATE INDEX IF NOT EXISTS idx_jobs_status_published ON jobs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_department_status ON jobs(department, status);

CREATE TABLE IF NOT EXISTS job_responsibilities (
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (job_id, position)
) STRICT;

CREATE TABLE IF NOT EXISTS job_qualifications (
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (job_id, position)
) STRICT;

CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  portfolio_url TEXT,
  interest TEXT NOT NULL,
  experience TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'interview', 'offer', 'hired', 'declined', 'withdrawn')),
  consent_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_applications_job_created ON job_applications(job_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status_created ON job_applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_email ON job_applications(email);

CREATE TABLE IF NOT EXISTS application_resumes (
  application_id TEXT PRIMARY KEY REFERENCES job_applications(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (
    content_type IN (
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
  ),
  size INTEGER NOT NULL CHECK (size > 0 AND size <= 1000000),
  base64_data TEXT NOT NULL,
  created_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS application_status_history (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
  from_status TEXT CHECK (from_status IS NULL OR from_status IN ('submitted', 'under_review', 'interview', 'offer', 'hired', 'declined', 'withdrawn')),
  to_status TEXT NOT NULL CHECK (to_status IN ('submitted', 'under_review', 'interview', 'offer', 'hired', 'declined', 'withdrawn')),
  note TEXT,
  changed_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_application_history_application ON application_status_history(application_id, changed_at ASC);

CREATE TABLE IF NOT EXISTS contact_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL CHECK (service IN ('engineering', 'environmental', 'real_estate', 'not_sure')),
  location TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'waiting_on_client', 'resolved', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_contact_status_created ON contact_requests(status, created_at DESC);

CREATE TABLE IF NOT EXISTS project_inquiries (
  id TEXT PRIMARY KEY,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_line TEXT NOT NULL CHECK (service_line IN ('engineering', 'environmental', 'real_estate', 'not_sure')),
  sub_service TEXT,
  property_address TEXT,
  city TEXT,
  project_description TEXT NOT NULL,
  desired_timeline TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'waiting_on_client', 'resolved', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_project_inquiries_status_created ON project_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_service ON project_inquiries(service_line, created_at DESC);
