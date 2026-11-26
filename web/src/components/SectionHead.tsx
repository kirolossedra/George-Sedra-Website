import type { ReactNode } from 'react';

type SectionHeadProps = {
  label: string;
  title: string;
  /** Heading id, used to label the surrounding section. */
  id?: string;
  /** Place the supporting text beside the heading instead of beneath it. */
  split?: boolean;
  children?: ReactNode;
};

export default function SectionHead({ label, title, id, split = false, children }: SectionHeadProps) {
  return (
    <div className={split ? 'section-head section-head--split' : 'section-head'}>
      <p className="t-label section-head__label">{label}</p>
      <div className="section-head__body">
        <h2 className="t-h2" id={id}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
