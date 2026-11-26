export const engineeringContent = {
  header: {
    label: 'Engineering consultation',
    title: 'Technical work that is prepared for the approval path, not just the drawing set.',
    intro: 'Coordinate structural, drafting, P.Eng., mechanical, electrical, HVAC, and municipal submission work around the actual requirements of the project.',
  },
  objective: {
    label: 'Core objective',
    title: 'Get from design intent to an approvable package.',
    body: "That means the work has to survive technical review, professional responsibility checks, and the municipality's submission process—not simply look complete.",
    action: { label: 'Discuss your submission', to: '/contact' },
  },
  scope: {
    label: 'Scope of services',
    title: 'What the engineering work covers.',
    groups: [
      {
        title: 'Municipal applications & approvals',
        items: ['Permit and application package coordination', 'Submission to municipal authorities', 'Review-comment tracking and response coordination', 'Drawing and supporting-document control'],
      },
      {
        title: 'Structural & drawing services',
        items: ['Existing-condition review', 'Structural drawings and details', 'Design coordination', 'Construction and permit drawing packages'],
      },
      {
        title: 'P.Eng. review & stamping',
        items: ['Professional engineering review where required', 'Stamped engineering documents within the responsible professional scope', 'Coordination of revisions before issue', 'Clear separation of drafting from professional approval'],
      },
      {
        title: 'Mechanical & electrical',
        items: ['Mechanical system coordination', 'Electrical design coordination', 'Service and equipment planning', 'Cross-discipline drawing review'],
      },
      {
        title: 'HVAC',
        items: ['Heating and cooling design coordination', 'Ventilation requirements', 'Equipment and distribution layouts', 'Permit-ready documentation where applicable'],
      },
    ],
  },
  responsibility: {
    label: 'Professional responsibility',
    title: 'Stamping is not a decorative final step.',
    paragraphs: [
      "A P.Eng. stamp represents professional responsibility for work within that engineer's competence and jurisdiction. The workflow therefore keeps drafting, coordination, review, and professional approval distinct rather than treating a stamp as something attached to any completed drawing.",
      'This is also why multidisciplinary work is coordinated rather than collapsed into one undefined role.',
    ],
  },
};
