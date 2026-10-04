import { CheckCircle2, DraftingCompass, FileSignature, Landmark, Snowflake, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const groups = [
  {
    icon: <Landmark size={24} />,
    title: 'Municipal applications & approvals',
    items: ['Permit and application package coordination', 'Submission to municipal authorities', 'Review-comment tracking and response coordination', 'Drawing and supporting-document control'],
  },
  {
    icon: <DraftingCompass size={24} />,
    title: 'Structural & drawing services',
    items: ['Existing-condition review', 'Structural drawings and details', 'Design coordination', 'Construction and permit drawing packages'],
  },
  {
    icon: <FileSignature size={24} />,
    title: 'P.Eng. review & stamping',
    items: ['Professional engineering review where required', 'Stamped engineering documents within the responsible professional scope', 'Coordination of revisions before issue', 'Clear separation of drafting from professional approval'],
  },
  {
    icon: <Zap size={24} />,
    title: 'Mechanical & electrical',
    items: ['Mechanical system coordination', 'Electrical design coordination', 'Service and equipment planning', 'Cross-discipline drawing review'],
  },
  {
    icon: <Snowflake size={24} />,
    title: 'HVAC',
    items: ['Heating and cooling design coordination', 'Ventilation requirements', 'Equipment and distribution layouts', 'Permit-ready documentation where applicable'],
  },
];

export default function EngineeringPage() {
  return (
    <>
      <PageHero eyebrow="Engineering consultation" title="Technical work that is prepared for the approval path, not just the drawing set." description="Coordinate structural, drafting, P.Eng., mechanical, electrical, HVAC, and municipal submission work around the actual requirements of the project." aside={<img className="page-hero-image" src="/assets/engineering-plan.jpg" alt="Engineering drawing package" />} />

      <section className="section">
        <div className="shell engineering-grid">
          <aside className="sticky-note">
            <p className="eyebrow">Core objective</p>
            <h2>Get from design intent to an approvable package.</h2>
            <p>That means the work has to survive technical review, professional responsibility checks, and the municipality's submission process—not simply look complete.</p>
            <Link className="button button-primary" to="/contact">Discuss your submission</Link>
          </aside>
          <div className="capability-list">
            {groups.map((group) => (
              <article className="capability-row" key={group.title}>
                <div className="capability-title"><span>{group.icon}</span><h3>{group.title}</h3></div>
                <ul>{group.items.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell two-column-copy">
          <div><p className="eyebrow">Professional responsibility</p><h2>Stamping is not a decorative final step.</h2></div>
          <div><p>A P.Eng. stamp represents professional responsibility for work within that engineer's competence and jurisdiction. The workflow therefore keeps drafting, coordination, review, and professional approval distinct rather than treating a stamp as something attached to any completed drawing.</p><p>This is also why multidisciplinary work is coordinated rather than collapsed into one undefined role.</p></div>
        </div>
      </section>
    </>
  );
}
