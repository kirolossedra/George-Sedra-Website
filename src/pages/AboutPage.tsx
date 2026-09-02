import { Compass, Layers3, Users } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A consulting company built around coordinated property decisions." description="The company brings engineering, environmental, and real estate work into one client relationship while preserving the professional boundaries each discipline requires." aside={<img className="profile-image" src="/assets/george-sedra.jpg" alt="George Sedra" />} />
      <section className="section">
        <div className="shell principles-grid">
          <article><Compass size={25} /><h2>Start with the client's actual objective</h2><p>The work should answer a real project question—approval, risk, feasibility, acquisition, sale—not create unnecessary scope for its own sake.</p></article>
          <article><Layers3 size={25} /><h2>Coordinate without blurring accountability</h2><p>Structural, environmental, MEP, and real estate work can be connected operationally while remaining clear about who is professionally responsible for each conclusion.</p></article>
          <article><Users size={25} /><h2>Keep people in the decision</h2><p>Clients should understand what is known, what remains uncertain, and what choices are genuinely theirs instead of being pushed through a black-box workflow.</p></article>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell founder-grid">
          <div className="founder-photo"><img src="/assets/george-sedra.jpg" alt="George Sedra portrait" /></div>
          <div><p className="eyebrow">Leadership</p><h2>George Sedra</h2><p className="founder-role">Company leadership profile</p><p>The original site included George's profile but did not contain enough verified biography, credentials, or licensing details to publish a responsible professional bio. This area is intentionally structured and ready for the real information rather than inventing credentials.</p><p>Add confirmed education, licences, years of experience, professional memberships, and project background here when available.</p></div>
        </div>
      </section>
    </>
  );
}
