import { ArrowRight, Building, FileSearch, Handshake, Map, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function RealEstatePage() {
  return (
    <>
      <PageHero eyebrow="Real estate" title="Property decisions with the technical questions visible before they become surprises." description="Real estate support for clients who may also need to understand approvals, existing conditions, or environmental due diligence around a property." aside={<img className="page-hero-image" src="/assets/project-site.jpg" alt="Commercial property streetscape" />} />
      <section className="section">
        <div className="shell real-estate-grid">
          <article><Building size={25} /><h2>Buy & sell support</h2><p>Client-facing property services, research, listing or acquisition coordination, and transaction support.</p></article>
          <article><Map size={25} /><h2>Property context</h2><p>Understand how location, current use, proposed use, and municipal constraints may affect the plan.</p></article>
          <article><FileSearch size={25} /><h2>Due-diligence coordination</h2><p>Bring engineering or environmental review into the decision when the property warrants it.</p></article>
          <article><Scale size={25} /><h2>Decision support</h2><p>Keep commercial judgment distinct from professional engineering and environmental opinions while making sure each informs the client at the right time.</p></article>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell property-workflow">
          <div className="property-image"><img src="/assets/site-map-east.jpg" alt="Property location map" /></div>
          <div>
            <p className="eyebrow">Connected when useful</p>
            <h2>Real estate does not become engineering—and engineering does not become sales.</h2>
            <p>The advantage of offering all three service lines is coordination, not blurred professional boundaries. A client can get the right specialist involved without forcing every property into every service.</p>
            <div className="inline-points"><span><Handshake size={18} />One client conversation</span><span><FileSearch size={18} />Separate professional scopes</span></div>
            <Link className="button button-primary" to="/contact">Discuss a property <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
