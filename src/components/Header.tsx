import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const links = [
  ['Engineering', '/engineering'],
  ['Environmental', '/environmental'],
  ['Real Estate', '/real-estate'],
  ['Careers', '/careers'],
  ['About', '/about'],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <NavLink to="/contact" className="button button-small button-primary">Start a project</NavLink>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="shell mobile-nav-inner">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/contact" className="mobile-nav-link">Contact</NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
