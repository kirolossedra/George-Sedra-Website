import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ number, title, description, to, icon }: { number: string; title: string; description: string; to: string; icon: ReactNode }) {
  return (
    <Link className="service-card" to={to}>
      <div className="service-card-top">
        <span className="service-number">{number}</span>
        <span className="service-icon">{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-link">Explore service <ArrowRight size={17} /></span>
    </Link>
  );
}
