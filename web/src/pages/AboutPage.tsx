import MediaImage from '../components/MediaImage';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import { aboutContent } from '../data/pages/about';

export default function AboutPage() {
  const { header, principles, leadership } = aboutContent;

  return (
    <>
      <PageHeader label={header.label} title={header.title} intro={header.intro} />

      <section className="section section--ruled" aria-labelledby="principles-title">
        <div className="container">
          <SectionHead label={principles.label} title={principles.title} id="principles-title" />
          <ol className="principles" role="list">
            {principles.items.map((item, index) => (
              <li className="principle" key={item.title}>
                <span className="t-index principle__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="t-h2 principle__title">{item.title}</h3>
                <p className="principle__body">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="leadership-title">
        <div className="container leader">
          <MediaImage slot="about.portrait" className="leader__portrait" />
          <div className="leader__text">
            <p className="t-label">{leadership.label}</p>
            <h2 className="t-h1" id="leadership-title">{leadership.name}</h2>
            <p className="leader__role">{leadership.role}</p>
            <div className="prose">
              {leadership.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
