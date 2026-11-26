import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Arrow from '../components/Arrow';
import { TextAreaField, TextField } from '../components/Field';
import PrototypeNotice from '../components/PrototypeNotice';
import { jobs } from '../data/jobs';
import { careersContent } from '../data/pages/careers';

export default function JobApplicationPage() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  if (!job) return <Navigate to="/careers" replace />;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="application" aria-labelledby="application-title">
      <div className="container">
        <Link className="back-link" to={`/careers/${job.id}`}><Arrow />Back to {job.title}</Link>

        <div className="application__layout">
          <div className="application__main">
            <header className="application__header">
              <p className="t-label">Application prototype</p>
              <h1 className="t-h1" id="application-title">Apply for {job.title}</h1>
              <p className="t-lead">Complete the experience as a candidate would see it. Nothing is transmitted from this version.</p>
            </header>

            <PrototypeNotice>{careersContent.applicationNotice}</PrototypeNotice>

            {submitted ? (
              <div className="confirmation" role="status">
                <h2 className="t-h2" ref={confirmationRef} tabIndex={-1}>Application flow complete</h2>
                <p>The interface is working, but no application was sent or stored.</p>
                <Link className="button" to="/careers">Return to careers<Arrow /></Link>
              </div>
            ) : (
              <form className="form" onSubmit={submit}>
                <fieldset className="form-section">
                  <legend className="form-section__legend">Contact details</legend>
                  <div className="form-row form-row--two">
                    <TextField label="First name" required name="firstName" autoComplete="given-name" />
                    <TextField label="Last name" required name="lastName" autoComplete="family-name" />
                  </div>
                  <div className="form-row form-row--two">
                    <TextField label="Email" required type="email" name="email" autoComplete="email" />
                    <TextField label="Phone" type="tel" name="phone" autoComplete="tel" />
                  </div>
                  <div className="form-row form-row--two">
                    <TextField label="Current city" name="city" autoComplete="address-level2" />
                    <TextField label="LinkedIn or portfolio" type="url" name="portfolio" placeholder="https://" />
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend className="form-section__legend">Your interest</legend>
                  <TextAreaField label="Why are you interested in this role?" required name="interest" rows={5} />
                  <TextAreaField label="Relevant experience" required name="experience" rows={6} />
                </fieldset>

                <fieldset className="form-section">
                  <legend className="form-section__legend">Resume</legend>
                  <div className="file-field">
                    <label className="field__label" htmlFor="resume">
                      <span>Resume file</span>
                      <span className="field__hint">PDF, DOC or DOCX</span>
                    </label>
                    <input
                      className="file-field__input"
                      id="resume"
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      aria-describedby="resume-status"
                      onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? '')}
                    />
                    <p className="file-field__status" id="resume-status" aria-live="polite">
                      {resumeName ? `Selected: ${resumeName}` : 'Visual prototype only. The file is not uploaded.'}
                    </p>
                  </div>
                </fieldset>

                <label className="check-field">
                  <input required type="checkbox" name="consent" />
                  <span>I understand this prototype does not transmit or store my application.</span>
                </label>

                <div className="form__actions">
                  <button className="button" type="submit">Complete prototype application</button>
                </div>
              </form>
            )}
          </div>

          <aside className="application__aside" aria-labelledby="application-role">
            <p className="t-label">Position</p>
            <h2 className="t-h3" id="application-role">{job.title}</h2>
            <dl className="application__facts">
              <div><dt className="t-label">Department</dt><dd>{job.department}</dd></div>
              <div><dt className="t-label">Location</dt><dd>{job.location}</dd></div>
              <div><dt className="t-label">Employment type</dt><dd>{job.type}</dd></div>
            </dl>
            <p className="t-muted">{job.summary}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
