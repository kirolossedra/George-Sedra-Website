import { Link } from 'react-router-dom';
import { companyNavigation, serviceNavigation, site, type NavItem } from '../data/site';
import Logo from './Logo';

function FooterLinks({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="site-footer__block">
      <h2>{title}</h2>
      <ul className="site-footer__links">
        {items.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer is-inverse">
      <div className="container">
        <div className="site-footer__lead">
          <div><Logo inverse /></div>
          <p className="site-footer__statement">{site.summary}</p>
        </div>

        <div className="site-footer__blocks">
          <FooterLinks title="Services" items={serviceNavigation} />
          <FooterLinks title="Company" items={companyNavigation} />
          <div className="site-footer__block">
            <h2>Important note</h2>
            <p className="site-footer__note">{site.professionalNote}</p>
          </div>
        </div>

        <div className="site-footer__base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Frontend prototype</span>
        </div>
      </div>
    </footer>
  );
}
