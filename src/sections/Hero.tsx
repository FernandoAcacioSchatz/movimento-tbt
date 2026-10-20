import { useTexts } from '../hooks/useTexts';
import { EditButton } from '../components/ui/EditButton';
import { onSectionLinkClick } from '../utils/scroll';

export function Hero() {
  const t = useTexts();
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <EditButton section="inicio" />
      <div className="hero__circle hero__circle--yellow" aria-hidden="true" />
      <div className="hero__circle hero__circle--teal" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <div className="kicker kicker--yellow">{t('heroKicker')}</div>
          <h1 id="hero-title" className="hero__title">
            {t('heroLine1')}<br /><span>{t('heroLine2')}</span>
          </h1>
          <p className="hero__lead">{t('heroText')}</p>
          <div className="hero__actions">
            <a className="btn btn--lg btn--yellow" href="#agenda" onClick={(e) => onSectionLinkClick(e, 'agenda')}>{t('heroBtn1')}</a>
            <a className="btn btn--lg btn--outline" href="#historia" onClick={(e) => onSectionLinkClick(e, 'historia')}>{t('heroBtn2')}</a>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__card-wrap">
            <div className="hero__card">
              <img
                src="/images/logo-tbt-completo-960.webp"
                srcSet="/images/logo-tbt-completo-480.webp 480w, /images/logo-tbt-completo-960.webp 960w"
                sizes="(max-width: 640px) 80vw, 420px"
                alt="Logo da Temporada Blumenauense de Teatro"
                width={960}
                height={386}
                fetchPriority="high"
              />
            </div>
            <div className="hero__bubble">
              <strong>{t('bubbleNum')}</strong>
              <span>{t('bubbleLabel')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
