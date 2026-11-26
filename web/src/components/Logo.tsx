import { Link } from 'react-router-dom';
import { site } from '../data/site';

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={inverse ? 'logo logo--inverse' : 'logo'} aria-label={`${site.name}, home`}>
      <span className="logo__mark" aria-hidden="true">{site.shortName}</span>
      <span className="logo__rule" aria-hidden="true" />
      <span className="logo__name" aria-hidden="true">Engineering</span>
    </Link>
  );
}
