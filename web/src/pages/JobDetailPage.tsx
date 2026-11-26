import { Link, Navigate, useParams } from 'react-router-dom';
import Arrow from '../components/Arrow';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';
import { careersContent } from '../data/pages/careers';

export default function JobDetailPage() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);
  if (!job) return <Navigate to="/careers" replace />;

  return (
    <article className="job-detail" aria-labelledby="job-title">
      <div className="container">
        <Link className="back-link" to="/careers"><Arrow />All positions</Link>

        <header className="job-detail__header">
          <p className="t-label">Careers</p>
          <h1 className="t-h1" id="job-title">{job.title}</h1>
          <dl className="meta-list job-detail__meta">
            <div><dt className="t-label">Department</dt><dd>{job.department}</dd></div>
            <div><dt className="t-label">Location</dt><dd>{job.location}</dd></div>
            <div><dt className="t-label">Employment type</dt><dd>{job.type}</dd></div>
          </dl>
          <Link className="button job-detail__apply" to={`/careers/${job.id}/apply`}>Apply for this role<Arrow /></Link>
        </header>

        <PrototypeNotice>{careersContent.detailNotice}</PrototypeNotice>

        <div className="job-detail__body">
          <div className="job-detail__main">
            <section aria-labelledby="role-about">
              <h2 className="t-h3" id="role-about">About the role</h2>
              <p className="t-lead">{job.summary}</p>
            </section>
            <section aria-labelledby="role-duties">
              <h2 className="t-h3" id="role-duties">What you would do</h2>
              <ul className="ruled-list ruled-list--plain" role="list">
                {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>
          <aside className="job-detail__aside" aria-labelledby="role-requirements">
            <h2 className="t-h3" id="role-requirements">What we are looking for</h2>
            <ul className="ruled-list ruled-list--plain" role="list">
              {job.qualifications.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link className="button button--secondary button--block" to={`/careers/${job.id}/apply`}>Start application<Arrow /></Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
