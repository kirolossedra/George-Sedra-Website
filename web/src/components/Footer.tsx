import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Engineering, environmental, and real estate consulting coordinated around one property decision.</p>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <Link to="/engineering">Engineering</Link>
          <Link to="/environmental">Environmental</Link>
          <Link to="/real-estate">Real Estate</Link>
        </div>
        <div>
          <h2 className="footer-heading">Company</h2>
          <Link to="/about">About</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h2 className="footer-heading">Important note</h2>
          <p>Professional services, stamps, and opinions are provided only within the scope and jurisdiction of appropriately qualified professionals.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} George Sedra Consulting</span>
        <span>Frontend prototype</span>
      </div>
    </footer>
  );
}
