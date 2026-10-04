import { ArrowLeft, CheckCircle2, Upload } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';

export default function JobApplicationPage() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState('');
  if (!job) return <Navigate to="/careers" replace />;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section application-page">
      <div className="shell application-shell">
        <Link className="back-link" to={`/careers/${job.id}`}><ArrowLeft size={17} />Back to {job.title}</Link>
        <div className="application-heading"><p className="eyebrow">Application prototype</p><h1>Apply for {job.title}</h1><p>Complete the experience as a candidate would see it. Nothing is transmitted from this version.</p></div>
        <PrototypeNotice>No backend is connected. Submitting this form only displays a local confirmation and does not send, save, or upload personal information.</PrototypeNotice>
        {submitted ? (
          <div className="submission-state"><CheckCircle2 size={40} /><h2>Application flow complete</h2><p>The interface is working, but no application was sent or stored.</p><Link className="button button-primary" to="/careers">Return to careers</Link></div>
        ) : (
          <form className="application-form" onSubmit={submit}>
            <div className="form-grid two"><label>First name<input required name="firstName" autoComplete="given-name" /></label><label>Last name<input required name="lastName" autoComplete="family-name" /></label></div>
            <div className="form-grid two"><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label></div>
            <div className="form-grid two"><label>Current city<input name="city" autoComplete="address-level2" /></label><label>LinkedIn or portfolio<input type="url" name="portfolio" placeholder="https://" /></label></div>
            <label>Why are you interested in this role?<textarea required name="interest" rows={5} /></label>
            <label>Relevant experience<textarea required name="experience" rows={6} /></label>
            <label className="upload-field"><span><Upload size={20} /><strong>Resume</strong><small>{resumeName || 'PDF or DOC/DOCX — visual prototype only'}</small></span><input type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? '')} /></label>
            <label className="consent-row"><input required type="checkbox" /><span>I understand this prototype does not transmit or store my application.</span></label>
            <button className="button button-primary" type="submit">Complete prototype application</button>
          </form>
        )}
      </div>
    </section>
  );
}
