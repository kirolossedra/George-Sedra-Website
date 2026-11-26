export const homeContent = {
  hero: {
    label: 'Engineering · Environment · Property',
    title: 'Move a property project from question to approval with fewer handoffs.',
    lead: 'GS Engineering coordinates engineering approvals, environmental due diligence, and real estate services so clients can make decisions with the technical context in view.',
    primaryAction: { label: 'Discuss a project', to: '/contact' },
    secondaryAction: { label: 'View engineering services', to: '/engineering' },
    highlights: ['Municipal submissions', 'P.Eng. coordination', 'Phase I & II ESA'],
  },
  services: {
    label: 'Three service lines',
    title: 'One property can create several kinds of risk.',
    intro: 'Instead of treating approvals, environmental history, and the transaction as unrelated files, the site is structured around how those decisions actually meet.',
    items: [
      {
        number: '01',
        title: 'Engineering consultation',
        description: 'Drawings, structural review, P.Eng. stamping, municipal applications, and coordinated mechanical, electrical, and HVAC work.',
        to: '/engineering',
      },
      {
        number: '02',
        title: 'Environmental consultation',
        description: 'Phase I and Phase II environmental site assessments, field investigation support, and decision-ready reporting.',
        to: '/environmental',
      },
      {
        number: '03',
        title: 'Real estate',
        description: 'Property services informed by the practical engineering and environmental questions that can affect a deal or development plan.',
        to: '/real-estate',
      },
    ],
  },
  process: {
    label: 'How projects move',
    title: 'Clear ownership at every step.',
    intro: 'Clients should know what is being prepared, who is responsible for the professional judgment, what the authority is waiting on, and what happens next.',
    steps: [
      { title: 'Scope the property and objective', description: 'Define the approval, investigation, or transaction question before producing work.' },
      { title: 'Coordinate the right disciplines', description: 'Bring in structural, MEP/HVAC, environmental, drafting, or real estate work only where the project calls for it.' },
      { title: 'Prepare and review the package', description: 'Keep technical documents, comments, and client decisions tied to a single project record.' },
      { title: 'Submit, respond, and close the loop', description: 'Track authority comments or outstanding due-diligence questions through resolution.' },
    ],
  },
  story: {
    label: 'Built around real sites',
    title: 'The work starts with the property, not the paperwork.',
    body: "Plans, existing conditions, environmental history, city requirements, and the client's actual intended use all shape the answer. The website reflects that: services stay distinct where professional responsibility demands it, but project coordination stays connected.",
    action: { label: 'How the company works', to: '/about' },
  },
  closing: {
    label: 'Start with the project question',
    title: 'Tell us what you are trying to approve, investigate, buy, or sell.',
    action: { label: 'Start a conversation', to: '/contact' },
  },
};
