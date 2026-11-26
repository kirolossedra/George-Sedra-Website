export type NavItem = { label: string; to: string };

export const site = {
  name: 'GS Engineering',
  shortName: 'GS',
  phoneDisplay: '(000) 000-0000',
  phoneHref: 'tel:+10000000000',
  email: 'info@example.com',
  location: 'Serving clients across your local region',
  summary: 'Engineering, environmental, and real estate consulting coordinated around one property decision.',
  professionalNote: 'Professional services, stamps, and opinions are provided only within the scope and jurisdiction of appropriately qualified professionals.',
  contactCta: { label: 'Start a project', to: '/contact' } satisfies NavItem,
};

export const primaryNavigation: NavItem[] = [
  { label: 'Engineering', to: '/engineering' },
  { label: 'Environmental', to: '/environmental' },
  { label: 'Real Estate', to: '/real-estate' },
  { label: 'Careers', to: '/careers' },
  { label: 'About', to: '/about' },
];

export const serviceNavigation: NavItem[] = [
  { label: 'Engineering', to: '/engineering' },
  { label: 'Environmental', to: '/environmental' },
  { label: 'Real Estate', to: '/real-estate' },
];

export const companyNavigation: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];
