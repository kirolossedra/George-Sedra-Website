import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import MediaImage from '../components/MediaImage';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import { realEstateContent } from '../data/pages/realEstate';

export default function RealEstatePage() {
  const { header, services, connected } = realEstateContent;

  return (
    <>
      <PageHeader
        label={header.label}
        title={header.title}
        intro={header.intro}
        aside={<MediaImage slot="realEstate.property" priority />}
      />

      <section className="section section--ruled" aria-labelledby="re-services-title">
        <div className="container">
          <SectionHead label={services.label} title={services.title} id="re-services-title" />
          <ul className="re-services" role="list">
            {services.items.map((item, index) => (
              <li className="re-services__item" key={item.title}>
                <span className="t-index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="t-h3">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="connected-title">
        <div className="container re-connected">
          <MediaImage slot="realEstate.context" className="re-connected__media" />
          <div className="re-connected__text">
            <p className="t-label">{connected.label}</p>
            <h2 className="t-h2" id="connected-title">{connected.title}</h2>
            <p>{connected.body}</p>
            <ul className="ruled-list ruled-list--plain re-connected__points" role="list">
              {connected.points.map((point) => <li key={point}><strong>{point}</strong></li>)}
            </ul>
            <Link className="button" to={connected.action.to}>{connected.action.label}<Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
