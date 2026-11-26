import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import PageHeader from '../components/PageHeader';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';
import { careersContent } from '../data/pages/careers';

const departments = ['All', 'Engineering', 'Environmental', 'Real Estate', 'Operations'] as const;

export default function CareersPage() {
  const [department, setDepartment] = useState<(typeof departments)[number]>('All');
  const filtered = useMemo(() => department === 'All' ? jobs : jobs.filter((job) => job.department === department), [department]);
  const { header } = careersContent;

  return (
    <>
      <PageHeader label={header.label} title={header.title} intro={header.intro} />

      <div className="container">
        <PrototypeNotice>{careersContent.listingNotice}</PrototypeNotice>
      </div>

      <section className="section section--tight" aria-labelledby="positions-title">
        <div className="container">
          <div className="jobs-toolbar">
            <h2 className="t-h2" id="positions-title">Open positions</h2>
            <div className="filter" role="group" aria-label="Filter positions by department">
              {departments.map((item) => (
                <button
                  type="button"
                  key={item}
                  className="filter__option"
                  aria-pressed={department === item}
                  onClick={() => setDepartment(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <p className="jobs-count t-label" aria-live="polite">
            {filtered.length} role{filtered.length === 1 ? '' : 's'}{department === 'All' ? '' : ` in ${department}`}
          </p>

          {filtered.length === 0 ? (
            <p className="jobs-empty">{careersContent.emptyState}</p>
          ) : (
            <ul className="jobs" role="list">
              {filtered.map((job) => (
                <li key={job.id}>
                  <Link className="job-row" to={`/careers/${job.id}`}>
                    <div className="job-row__main">
                      <h3 className="t-h3 job-row__title">{job.title}</h3>
                      <p>{job.summary}</p>
                    </div>
                    <dl className="job-row__meta">
                      <div><dt className="t-label">Department</dt><dd>{job.department}</dd></div>
                      <div><dt className="t-label">Location</dt><dd>{job.location}</dd></div>
                      <div><dt className="t-label">Type</dt><dd>{job.type}</dd></div>
                    </dl>
                    <span className="job-row__more"><span className="visually-hidden">View role</span><Arrow /></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
