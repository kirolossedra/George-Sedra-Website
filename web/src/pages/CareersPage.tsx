import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';

const departments = ['All', 'Engineering', 'Environmental', 'Real Estate', 'Operations'] as const;

export default function CareersPage() {
  const [department, setDepartment] = useState<(typeof departments)[number]>('All');
  const filtered = useMemo(() => department === 'All' ? jobs : jobs.filter((job) => job.department === department), [department]);

  return (
    <>
      <PageHero eyebrow="Careers" title="Build practical work with visible responsibility." description="We are designing the careers experience now so future job postings and applications have a clear, professional workflow before a backend is connected." />
      <section className="section-tight">
        <div className="shell"><PrototypeNotice>This careers area is a frontend prototype. Job data is local and applications are not transmitted or stored yet.</PrototypeNotice></div>
      </section>
      <section className="section">
        <div className="shell careers-layout">
          <aside className="career-filter" aria-label="Filter positions">
            <p className="eyebrow">Departments</p>
            <div className="filter-buttons">
              {departments.map((item) => <button type="button" key={item} className={department === item ? 'filter-button active' : 'filter-button'} onClick={() => setDepartment(item)}>{item}</button>)}
            </div>
          </aside>
          <div className="jobs-list">
            <div className="jobs-list-header"><h2>Open positions</h2><span>{filtered.length} role{filtered.length === 1 ? '' : 's'}</span></div>
            {filtered.length === 0 ? <div className="empty-state">No prototype roles are listed in this department yet.</div> : filtered.map((job) => (
              <Link className="job-row" to={`/careers/${job.id}`} key={job.id}>
                <div className="job-row-main"><span className="job-icon"><BriefcaseBusiness size={20} /></span><div><h3>{job.title}</h3><p>{job.summary}</p></div></div>
                <div className="job-meta"><span>{job.department}</span><span><MapPin size={15} />{job.location}</span><span>{job.type}</span></div>
                <ArrowRight className="job-arrow" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
