import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import MediaImage from '../components/MediaImage';
import SectionHead from '../components/SectionHead';
import { homeContent } from '../data/pages/home';

export default function HomePage() {
  const { hero, services, process, story, closing } = homeContent;

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container home-hero__grid">
          <p className="t-label home-hero__label">{hero.label}</p>
          <h1 className="t-display home-hero__title" id="home-title">{hero.title}</h1>
          <div className="home-hero__intro">
            <p className="t-lead">{hero.lead}</p>
            <div className="button-row">
              <Link className="button" to={hero.primaryAction.to}>{hero.primaryAction.label}<Arrow /></Link>
              <Link className="button button--secondary" to={hero.secondaryAction.to}>{hero.secondaryAction.label}</Link>
            </div>
          </div>
          <ul className="home-hero__highlights" role="list" aria-label="Service highlights">
            {hero.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="container home-hero__media">
          <MediaImage slot="home.hero" priority />
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHead label={services.label} title={services.title} id="services-title" split>
            <p>{services.intro}</p>
          </SectionHead>
          <ul className="index-list" role="list">
            {services.items.map((service) => (
              <li key={service.to}>
                <Link className="index-row" to={service.to}>
                  <span className="t-index index-row__number">{service.number}</span>
                  <h3 className="t-h2 index-row__title">{service.title}</h3>
                  <p className="index-row__body">{service.description}</p>
                  <span className="index-row__more">Explore service<Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="process-title">
        <div className="container">
          <SectionHead label={process.label} title={process.title} id="process-title">
            <p>{process.intro}</p>
          </SectionHead>
          <ol className="sequence" role="list">
            {process.steps.map((step, index) => (
              <li className="sequence__step" key={step.title}>
                <span className="t-index sequence__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="t-h3">{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="story-title">
        <div className="container home-story">
          <MediaImage slot="home.drawing" className="home-story__media" />
          <div className="home-story__text">
            <p className="t-label">{story.label}</p>
            <h2 className="t-h2" id="story-title">{story.title}</h2>
            <p>{story.body}</p>
            <Link className="text-link" to={story.action.to}>{story.action.label}<Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section section--ruled closing" aria-labelledby="closing-title">
        <div className="container closing__grid">
          <p className="t-label closing__label">{closing.label}</p>
          <div className="closing__body">
            <h2 className="t-h1" id="closing-title">{closing.title}</h2>
            <Link className="button" to={closing.action.to}>{closing.action.label}<Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
