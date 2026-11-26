import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SelectField, TextAreaField, TextField } from '../components/Field';
import PageHeader from '../components/PageHeader';
import PrototypeNotice from '../components/PrototypeNotice';
import { contactContent } from '../data/pages/contact';
import { site } from '../data/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const { header } = contactContent;

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader label={header.label} title={header.title} intro={header.intro} />

      <div className="container">
        <PrototypeNotice>{contactContent.notice}</PrototypeNotice>
      </div>

      <section className="section section--tight" aria-label="Contact details and enquiry form">
        <div className="container contact">
          <dl className="contact__details">
            <div>
              <dt className="t-label">Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div>
              <dt className="t-label">Phone</dt>
              <dd><a href={site.phoneHref}>{site.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="t-label">Service area</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>

          <div className="contact__form">
            {submitted ? (
              <div className="confirmation" role="status">
                <h2 className="t-h2" ref={confirmationRef} tabIndex={-1}>Contact flow complete</h2>
                <p>No message was sent. This confirms the frontend interaction only.</p>
                <button className="button button--secondary" type="button" onClick={() => setSubmitted(false)}>Send another test</button>
              </div>
            ) : (
              <form className="form" onSubmit={submit} aria-labelledby="enquiry-title">
                <fieldset className="form-section">
                  <legend className="form-section__legend" id="enquiry-title">Project enquiry</legend>
                  <div className="form-row form-row--two">
                    <TextField label="Name" required name="name" autoComplete="name" />
                    <TextField label="Email" required type="email" name="email" autoComplete="email" />
                  </div>
                  <div className="form-row form-row--two">
                    <TextField label="Phone" type="tel" name="phone" autoComplete="tel" />
                    <SelectField label="Service" required name="service" defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {contactContent.serviceOptions.map((option) => <option key={option}>{option}</option>)}
                    </SelectField>
                  </div>
                  <TextField label="Project address or general location" name="location" autoComplete="street-address" />
                  <TextAreaField label="What are you trying to accomplish?" required name="message" rows={6} />
                </fieldset>
                <div className="form__actions">
                  <button className="button" type="submit">Complete contact prototype</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
