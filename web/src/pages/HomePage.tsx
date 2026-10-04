import { ArrowRight, Building2, FileCheck2, Leaf, Ruler, SearchCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">Engineering · Environment · Property</p>
            <h1>Move a property project from question to approval with fewer handoffs.</h1>
            <p className="hero-lead">
              George Sedra Consulting coordinates engineering approvals, environmental due diligence, and real estate services so clients can make decisions with the technical context in view.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/contact">Discuss a project <ArrowRight size={18} /></Link>
              <Link className="button button-secondary" to="/engineering">View engineering services</Link>
            </div>
            <div className="hero-proof" aria-label="Service highlights">
              <span><FileCheck2 size={18} /> Municipal submissions</span>
              <span><ShieldCheck size={18} /> P.Eng. coordination</span>
              <span><SearchCheck size={18} /> Phase I & II ESA</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Engineering drawing and project imagery">
            <img className="hero-main-image" src="/assets/engineering-plan.jpg" alt="Technical site and engineering plan" />
            <div className="hero-image-caption">
              <span>From drawing package</span>
              <strong>to municipal review</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Three service lines</p>
              <h2>One property can create several kinds of risk.</h2>
            </div>
            <p>Instead of treating approvals, environmental history, and the transaction as unrelated files, the site is structured around how those decisions actually meet.</p>
          </div>
          <div className="services-grid">
            <ServiceCard number="01" title="Engineering consultation" description="Drawings, structural review, P.Eng. stamping, municipal applications, and coordinated mechanical, electrical, and HVAC work." to="/engineering" icon={<Ruler size={24} />} />
            <ServiceCard number="02" title="Environmental consultation" description="Phase I and Phase II environmental site assessments, field investigation support, and decision-ready reporting." to="/environmental" icon={<Leaf size={24} />} />
            <ServiceCard number="03" title="Real estate" description="Property services informed by the practical engineering and environmental questions that can affect a deal or development plan." to="/real-estate" icon={<Building2 size={24} />} />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell process-layout">
          <div className="process-intro">
            <p className="eyebrow">How projects move</p>
            <h2>Clear ownership at every step.</h2>
            <p>Clients should know what is being prepared, who is responsible for the professional judgment, what the authority is waiting on, and what happens next.</p>
          </div>
          <ol className="process-list">
            <li><span>1</span><div><h3>Scope the property and objective</h3><p>Define the approval, investigation, or transaction question before producing work.</p></div></li>
            <li><span>2</span><div><h3>Coordinate the right disciplines</h3><p>Bring in structural, MEP/HVAC, environmental, drafting, or real estate work only where the project calls for it.</p></div></li>
            <li><span>3</span><div><h3>Prepare and review the package</h3><p>Keep technical documents, comments, and client decisions tied to a single project record.</p></div></li>
            <li><span>4</span><div><h3>Submit, respond, and close the loop</h3><p>Track authority comments or outstanding due-diligence questions through resolution.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section image-story-section">
        <div className="shell image-story-grid">
          <div className="image-frame"><img src="/assets/project-site.jpg" alt="Existing project site and streetscape" /></div>
          <div className="image-story-copy">
            <p className="eyebrow">Built around real sites</p>
            <h2>The work starts with the property, not the paperwork.</h2>
            <p>Plans, existing conditions, environmental history, city requirements, and the client's actual intended use all shape the answer. The website reflects that: services stay distinct where professional responsibility demands it, but project coordination stays connected.</p>
            <Link className="text-link" to="/about">How the company works <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="shell cta-panel">
          <div><p className="eyebrow eyebrow-light">Start with the project question</p><h2>Tell us what you are trying to approve, investigate, buy, or sell.</h2></div>
          <Link className="button button-light" to="/contact">Start a conversation <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
