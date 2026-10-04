export type Job = {
  id: string;
  title: string;
  department: 'Engineering' | 'Environmental' | 'Real Estate' | 'Operations';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

export const jobs: Job[] = [
  {
    id: 'project-coordinator',
    title: 'Project Coordinator',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    summary: 'Coordinate drawing packages, permit submissions, consultant inputs, and municipal review comments from intake through approval.',
    responsibilities: [
      'Track project milestones, submissions, and authority comments.',
      'Coordinate structural, mechanical, electrical, and drafting inputs.',
      'Prepare client-ready status updates and submission packages.',
      'Maintain project records and document control.',
    ],
    qualifications: [
      'Strong organization and written communication.',
      'Comfort reading technical drawings and permit documentation.',
      'Experience in construction, engineering, architecture, or municipal processes is an asset.',
    ],
  },
  {
    id: 'environmental-field-technician',
    title: 'Environmental Field Technician',
    department: 'Environmental',
    location: 'Field / Office',
    type: 'Contract',
    summary: 'Support Phase I and Phase II environmental work through field documentation, site observations, sampling coordination, and reporting support.',
    responsibilities: [
      'Assist with site reconnaissance and field records.',
      'Support sampling activities under project direction.',
      'Organize laboratory, photographic, and location documentation.',
      'Contribute to technical report preparation.',
    ],
    qualifications: [
      'Environmental, geological, civil, or related technical education.',
      'Comfort working outdoors and travelling to project sites.',
      'Careful documentation and attention to chain-of-custody requirements.',
    ],
  },
  {
    id: 'real-estate-associate',
    title: 'Real Estate Associate',
    department: 'Real Estate',
    location: 'Hybrid',
    type: 'Full-time',
    summary: 'Support property research, client communication, market analysis, and transaction coordination across residential and investment work.',
    responsibilities: [
      'Prepare property and market research summaries.',
      'Coordinate client appointments and transaction documentation.',
      'Support listing and acquisition workflows.',
      'Work with technical teams when a property requires engineering or environmental review.',
    ],
    qualifications: [
      'Strong client communication and commercial judgment.',
      'Real estate experience or relevant licensing is an asset.',
      'Ability to work across technical and transaction-focused teams.',
    ],
  },
];
