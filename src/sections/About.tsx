import { useTexts } from '../hooks/useTexts';
import { EditButton } from '../components/ui/EditButton';
import { accentColor } from '../utils/format';

export function About() {
  const t = useTexts();
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <EditButton section="sobre" />
      <div className="container about">
        <div className="about__left">
          <div className="kicker kicker--teal">{t('sobreKicker')}</div>
          <h2 id="sobre-title" className="h2">{t('sobreTitle')}</h2>
          <div className="stats">
            {[1, 2, 3, 4].map((n, i) => (
              <div key={n}>
                <div className="stat__value" style={{ background: accentColor(i) }}>{t(`stat${n}v`)}</div>
                <div className="stat__label">{t(`stat${n}l`)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about__right lead">
          <p className="pre-line">{t('sobreP1')}</p>
          <p className="pre-line">{t('sobreP2')}</p>
        </div>
      </div>
    </section>
  );
}
