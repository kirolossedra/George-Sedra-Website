export const environmentalContent = {
  header: {
    label: 'Environmental consultation',
    title: 'Environmental due diligence that tells you what needs attention next.',
    intro: 'Phase I and Phase II environmental site assessment workflows built around evidence, site history, field investigation, and clear reporting.',
  },
  phases: [
    {
      numeral: 'I',
      label: 'Phase I ESA',
      title: "Understand the site's history and potential areas of concern.",
      steps: [
        { title: 'Records review', description: 'Historical and available property information.' },
        { title: 'Site reconnaissance', description: 'Existing conditions and surrounding context.' },
        { title: 'Assessment report', description: 'Findings, limitations, and recommendations.' },
      ],
    },
    {
      numeral: 'II',
      label: 'Phase II ESA',
      title: 'Investigate identified concerns through targeted field work.',
      steps: [
        { title: 'Sampling plan', description: 'Target the questions raised by the site history and conditions.' },
        { title: 'Field investigation', description: 'Coordinate site work and sampling locations.' },
        { title: 'Results & interpretation', description: 'Translate laboratory and field data into project decisions.' },
      ],
    },
  ],
  decision: {
    label: 'Not every Phase I leads to Phase II',
    title: 'Investigation should follow evidence, not become an automatic upsell.',
    body: 'The purpose of due diligence is to reduce uncertainty enough for a responsible next decision. Where the evidence does not justify intrusive work, the process should say so. Where it does, Phase II should be scoped to the actual concern.',
    action: { label: 'Discuss a site', to: '/contact' },
  },
};
