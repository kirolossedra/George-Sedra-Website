import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import MediaImage from '../components/MediaImage';
import PageHeader from '../components/PageHeader';
import { environmentalContent } from '../data/pages/environmental';

export default function EnvironmentalPage() {
  const { header, phases, decision } = environmentalContent;

  return (
    <>
      <PageHeader label={header.label} title={header.title} intro={header.intro} />

      <section className="section section--flush-top" aria-label="Phase I and Phase II environmental site assessment">
        <div className="container">
          <div className="phases">
            {phases.map((phase) => (
              <article className="phase" key={phase.label} aria-labelledby={`phase-${phase.numeral}`}>
                <p className="t-label" id={`phase-${phase.numeral}`}>{phase.label}</p>
                <h2 className="t-h3 phase__title">{phase.title}</h2>
                <ol className="phase__steps" role="list">
                  {phase.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="t-index">{phase.numeral}.{index + 1}</span>
                      <div>
                        <h3 className="t-h4">{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="decision-title">
        <div className="container env-decision">
          <div className="env-decision__text">
            <p className="t-label">{decision.label}</p>
            <h2 className="t-h2" id="decision-title">{decision.title}</h2>
            <p>{decision.body}</p>
            <Link className="text-link" to={decision.action.to}>{decision.action.label}<Arrow /></Link>
          </div>
          <MediaImage slot="environmental.siteLocation" className="env-decision__media" />
        </div>
      </section>
    </>
  );
}
