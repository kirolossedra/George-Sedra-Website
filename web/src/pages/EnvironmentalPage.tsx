import { ArrowRight, ClipboardList, FlaskConical, MapPinned, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function EnvironmentalPage() {
  return (
    <>
      <PageHero eyebrow="Environmental consultation" title="Environmental due diligence that tells you what needs attention next." description="Phase I and Phase II environmental site assessment workflows built around evidence, site history, field investigation, and clear reporting." aside={<div className="map-collage"><img src="/assets/site-map-east.jpg" alt="Site location map" /><img src="/assets/site-map-west.jpg" alt="Alternate site map view" /></div>} />
      <section className="section">
        <div className="shell phase-grid">
          <article className="phase-card">
            <div className="phase-number">01</div>
            <p className="eyebrow">Phase I ESA</p>
            <h2>Understand the site's history and potential areas of concern.</h2>
            <div className="phase-steps">
              <span><Search size={20} /><strong>Records review</strong><small>Historical and available property information.</small></span>
              <span><MapPinned size={20} /><strong>Site reconnaissance</strong><small>Existing conditions and surrounding context.</small></span>
              <span><ClipboardList size={20} /><strong>Assessment report</strong><small>Findings, limitations, and recommendations.</small></span>
            </div>
          </article>
          <article className="phase-card phase-card-dark">
            <div className="phase-number">02</div>
            <p className="eyebrow eyebrow-light">Phase II ESA</p>
            <h2>Investigate identified concerns through targeted field work.</h2>
            <div className="phase-steps">
              <span><FlaskConical size={20} /><strong>Sampling plan</strong><small>Target the questions raised by the site history and conditions.</small></span>
              <span><MapPinned size={20} /><strong>Field investigation</strong><small>Coordinate site work and sampling locations.</small></span>
              <span><ClipboardList size={20} /><strong>Results & interpretation</strong><small>Translate laboratory and field data into project decisions.</small></span>
            </div>
          </article>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell decision-banner">
          <div><p className="eyebrow">Not every Phase I leads to Phase II</p><h2>Investigation should follow evidence, not become an automatic upsell.</h2></div>
          <div><p>The purpose of due diligence is to reduce uncertainty enough for a responsible next decision. Where the evidence does not justify intrusive work, the process should say so. Where it does, Phase II should be scoped to the actual concern.</p><Link className="text-link" to="/contact">Discuss a site <ArrowRight size={17} /></Link></div>
        </div>
      </section>
    </>
  );
}
