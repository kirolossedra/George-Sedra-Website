import { ArrowLeft, BriefcaseBusiness, MapPin } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';

export default function JobDetailPage() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);
  if (!job) return <Navigate to="/careers" replace />;

  return (
    <section className="section job-detail-page">
      <div className="shell job-detail-shell">
        <Link className="back-link" to="/careers"><ArrowLeft size={17} />All positions</Link>
        <div className="job-detail-header">
          <div><p className="eyebrow">{job.department}</p><h1>{job.title}</h1><div className="job-detail-meta"><span><MapPin size={16} />{job.location}</span><span><BriefcaseBusiness size={16} />{job.type}</span></div></div>
          <Link className="button button-primary" to={`/careers/${job.id}/apply`}>Apply for this role</Link>
        </div>
        <PrototypeNotice>This is a sample position in the frontend prototype and should not be interpreted as a currently advertised vacancy until the company confirms it.</PrototypeNotice>
        <div className="job-content-grid">
          <div><h2>About the role</h2><p>{job.summary}</p><h2>What you would do</h2><ul className="detail-list">{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <aside><h2>What we are looking for</h2><ul className="detail-list">{job.qualifications.map((item) => <li key={item}>{item}</li>)}</ul><Link className="button button-primary button-full" to={`/careers/${job.id}/apply`}>Start application</Link></aside>
        </div>
      </div>
    </section>
  );
}
