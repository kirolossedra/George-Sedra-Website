import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { primaryNavigation, site } from '../data/site';
import Arrow from './Arrow';
import Logo from './Logo';

const DESKTOP_QUERY = '(min-width: 68rem)';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-menu-open', open);
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onViewportChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onViewportChange);
      document.documentElement.classList.remove('is-menu-open');
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Logo />

        <nav className="primary-nav" aria-label="Primary">
          <ul className="primary-nav__list">
            {primaryNavigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="primary-nav__link">{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to={site.contactCta.to} className="button button--compact site-header__cta">{site.contactCta.label}</Link>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle__glyph" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container mobile-menu__inner" aria-label="Mobile">
          <ul className="mobile-menu__list">
            {[...primaryNavigation, { label: 'Contact', to: '/contact' }].map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="mobile-menu__link">
                  {item.label}
                  <Arrow />
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mobile-menu__foot">{site.summary}</p>
        </nav>
      </div>
    </header>
  );
}
