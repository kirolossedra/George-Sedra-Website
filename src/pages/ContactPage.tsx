import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import PageHero from '../components/PageHero';
import PrototypeNotice from '../components/PrototypeNotice';
import { site } from '../data/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <>
      <PageHero eyebrow="Contact" title="Start with the property and the decision you need to make." description="A useful first conversation should establish the site, objective, current documents, timing, and which professional scopes may actually be needed." />
      <section className="section-tight"><div className="shell"><PrototypeNotice>Contact details below are placeholders until the company's real phone, email, and service area are confirmed. The form is frontend-only.</PrototypeNotice></div></section>
      <section className="section">
        <div className="shell contact-grid">
          <aside className="contact-details">
            <div><Mail size={20} /><span><small>Email</small><strong>{site.email}</strong></span></div>
            <div><Phone size={20} /><span><small>Phone</small><strong>{site.phoneDisplay}</strong></span></div>
            <div><MapPin size={20} /><span><small>Service area</small><strong>{site.location}</strong></span></div>
          </aside>
          {submitted ? <div className="submission-state"><CheckCircle2 size={40} /><h2>Contact flow complete</h2><p>No message was sent. This confirms the frontend interaction only.</p><button className="button button-secondary" type="button" onClick={() => setSubmitted(false)}>Send another test</button></div> : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-grid two"><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label></div>
              <div className="form-grid two"><label>Phone<input type="tel" name="phone" /></label><label>Service<select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Engineering consultation</option><option>Environmental consultation</option><option>Real estate</option><option>Not sure yet</option></select></label></div>
              <label>Project address or general location<input name="location" /></label>
              <label>What are you trying to accomplish?<textarea required name="message" rows={6} /></label>
              <button className="button button-primary" type="submit">Complete contact prototype</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
