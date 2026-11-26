import type { ReactNode } from 'react';

type PageHeaderProps = {
  label: string;
  title: string;
  intro?: string;
  /** Optional content beside the title on wide screens, such as an image. */
  aside?: ReactNode;
  /** Optional content below the introduction, such as actions. */
  children?: ReactNode;
};

export default function PageHeader({ label, title, intro, aside, children }: PageHeaderProps) {
  return (
    <header className={aside ? 'page-header page-header--with-aside' : 'page-header'}>
      <div className="container page-header__grid">
        <p className="t-label page-header__label">{label}</p>
        <div className="page-header__main">
          <h1 className="t-h1 page-header__title">{title}</h1>
          {intro && <p className="t-lead page-header__intro">{intro}</p>}
          {children}
        </div>
        {aside && <div className="page-header__aside">{aside}</div>}
      </div>
    </header>
  );
}
