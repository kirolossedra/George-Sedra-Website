-- Optional local-development seed data matching the current frontend prototype roles.
-- Do not run this migration in production if these are not real openings.

INSERT OR IGNORE INTO jobs
  (id, slug, title, department, location, employment_type, work_mode, summary, description, status, created_at, updated_at, published_at)
VALUES
  ('seed-project-coordinator', 'project-coordinator', 'Project Coordinator', 'engineering', 'Hybrid', 'full_time', 'hybrid',
   'Coordinate drawing packages, permit submissions, consultant inputs, and municipal review comments from intake through approval.',
   'Coordinate engineering documentation and municipal submission workflows across disciplines.',
   'draft', '2026-09-06T00:00:00.000Z', '2026-09-06T00:00:00.000Z', NULL),
  ('seed-environmental-field-technician', 'environmental-field-technician', 'Environmental Field Technician', 'environmental', 'Field / Office', 'contract', 'field_office',
   'Support Phase I and Phase II environmental work through field documentation, site observations, sampling coordination, and reporting support.',
   'Support environmental fieldwork and reporting under project direction.',
   'draft', '2026-09-06T00:00:00.000Z', '2026-09-06T00:00:00.000Z', NULL),
  ('seed-real-estate-associate', 'real-estate-associate', 'Real Estate Associate', 'real_estate', 'Hybrid', 'full_time', 'hybrid',
   'Support property research, client communication, market analysis, and transaction coordination across residential and investment work.',
   'Support property research and transaction coordination across the real-estate practice.',
   'draft', '2026-09-06T00:00:00.000Z', '2026-09-06T00:00:00.000Z', NULL);

INSERT OR IGNORE INTO job_responsibilities (job_id, position, content) VALUES
  ('seed-project-coordinator', 0, 'Track project milestones, submissions, and authority comments.'),
  ('seed-project-coordinator', 1, 'Coordinate structural, mechanical, electrical, and drafting inputs.'),
  ('seed-project-coordinator', 2, 'Prepare client-ready status updates and submission packages.'),
  ('seed-project-coordinator', 3, 'Maintain project records and document control.'),
  ('seed-environmental-field-technician', 0, 'Assist with site reconnaissance and field records.'),
  ('seed-environmental-field-technician', 1, 'Support sampling activities under project direction.'),
  ('seed-environmental-field-technician', 2, 'Organize laboratory, photographic, and location documentation.'),
  ('seed-environmental-field-technician', 3, 'Contribute to technical report preparation.'),
  ('seed-real-estate-associate', 0, 'Prepare property and market research summaries.'),
  ('seed-real-estate-associate', 1, 'Coordinate client appointments and transaction documentation.'),
  ('seed-real-estate-associate', 2, 'Support listing and acquisition workflows.'),
  ('seed-real-estate-associate', 3, 'Work with technical teams when a property requires engineering or environmental review.');

INSERT OR IGNORE INTO job_qualifications (job_id, position, content) VALUES
  ('seed-project-coordinator', 0, 'Strong organization and written communication.'),
  ('seed-project-coordinator', 1, 'Comfort reading technical drawings and permit documentation.'),
  ('seed-project-coordinator', 2, 'Experience in construction, engineering, architecture, or municipal processes is an asset.'),
  ('seed-environmental-field-technician', 0, 'Environmental, geological, civil, or related technical education.'),
  ('seed-environmental-field-technician', 1, 'Comfort working outdoors and travelling to project sites.'),
  ('seed-environmental-field-technician', 2, 'Careful documentation and attention to chain-of-custody requirements.'),
  ('seed-real-estate-associate', 0, 'Strong client communication and commercial judgment.'),
  ('seed-real-estate-associate', 1, 'Real estate experience or relevant licensing is an asset.'),
  ('seed-real-estate-associate', 2, 'Ability to work across technical and transaction-focused teams.');
