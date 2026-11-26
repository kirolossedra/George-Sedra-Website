import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import MediaImage from '../components/MediaImage';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import { engineeringContent } from '../data/pages/engineering';

export default function EngineeringPage() {
  const { header, objective, scope, responsibility } = engineeringContent;

  return (
    <>
      <PageHeader label={header.label} title={header.title} intro={header.intro} />

      <section className="section section--flush-top" aria-labelledby="objective-title">
        <div className="container eng-objective">
          <MediaImage slot="engineering.drawing" priority className="eng-objective__media" />
          <div className="eng-objective__text">
            <p className="t-label">{objective.label}</p>
            <h2 className="t-h2" id="objective-title">{objective.title}</h2>
            <p>{objective.body}</p>
            <Link className="button" to={objective.action.to}>{objective.action.label}<Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section section--ruled" aria-labelledby="scope-title">
        <div className="container">
          <SectionHead label={scope.label} title={scope.title} id="scope-title" />
          <div className="spec">
            {scope.groups.map((group, groupIndex) => (
              <article className="spec__group" key={group.title} aria-labelledby={`spec-${groupIndex}`}>
                <h3 className="t-h3 spec__title" id={`spec-${groupIndex}`}>
                  <span className="t-index spec__number">{groupIndex + 1}.0</span>
                  {group.title}
                </h3>
                <ul className="ruled-list spec__items" role="list">
                  {group.items.map((item, itemIndex) => (
                    <li key={item}>
                      <span className="ruled-list__index">{groupIndex + 1}.{itemIndex + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="responsibility-title">
        <div className="container statement">
          <p className="t-label statement__label">{responsibility.label}</p>
          <h2 className="t-h1 statement__title" id="responsibility-title">{responsibility.title}</h2>
          <div className="statement__body">
            {responsibility.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>
    </>
  );
}
