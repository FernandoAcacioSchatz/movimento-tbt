import { useTexts } from '../hooks/useTexts';
import { EditButton } from '../components/ui/EditButton';

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
            <a className="btn btn--lg btn--yellow" href="#agenda">{t('heroBtn1')}</a>
            <a className="btn btn--lg btn--outline" href="#historia">{t('heroBtn2')}</a>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__card-wrap">
            <div className="hero__card">
              <picture>
                <source srcSet="/images/logo-temporada-2025-480.webp 480w, /images/logo-temporada-2025-800.webp 800w" sizes="(max-width: 640px) 80vw, 400px" type="image/webp" />
                <img src="/images/logo-temporada-2025-800.webp" alt="Logo Temporada 2025 — Temporada Blumenauense de Teatro" width={800} height={1000} fetchPriority="high" />
              </picture>
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
