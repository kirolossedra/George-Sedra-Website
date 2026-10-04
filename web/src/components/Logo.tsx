import { Link } from 'react-router-dom';
import { site } from '../data/site';

export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label={`${site.name} home`}>
      <span className="brand-mark" aria-hidden="true">
        <span>G</span><span>S</span>
      </span>
      <span className="brand-copy">
        <strong>George Sedra</strong>
        <span>Consulting</span>
      </span>
    </Link>
  );
}
