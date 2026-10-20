import { useContent } from '../hooks/useContent';
import { useTexts } from '../hooks/useTexts';
import { useScrollCarousel } from '../hooks/useScrollCarousel';
import { EditButton } from '../components/ui/EditButton';
import { CarouselControls } from '../components/ui/CarouselControls';
import { SafeLink } from '../components/ui/SafeLink';
import { accentColor } from '../utils/format';
import { safeUrl } from '../utils/url';

export function Cast() {
  const { content } = useContent();
  const t = useTexts();
  const members = content?.members ?? [];
  const { setTrack, next, prev, onScroll, paused, togglePause, hoverHandlers } = useScrollCarousel({ count: members.length, interval: 3500 });

  return (
    <section id="integrantes" className="section" aria-labelledby="elenco-title">
      <EditButton section="integrantes" />
      <div className="container">
        <div className="kicker kicker--orange">{t('elencoKicker')}</div>
        <div className="section__head" style={{ marginBottom: 'var(--space-6)' }}>
          <h2 id="elenco-title" className="h2">{t('elencoTitle')}</h2>
          {members.length > 1 && <CarouselControls onPrev={prev} onNext={next} paused={paused} onTogglePause={togglePause} label="integrantes" />}
        </div>
      </div>
      {members.length === 0 ? (
        <div className="container"><p className="empty">Em breve.</p></div>
      ) : (
        <div role="region" aria-roledescription="carrossel" aria-label="Integrantes do movimento" {...hoverHandlers}>
          <div ref={setTrack} className="cast-track noscroll" onScroll={onScroll} tabIndex={0}>
            {members.map((m, i) => {
              const color = accentColor(i);
              const photo = safeUrl(m.photo_url);
              return (
                <article key={m.id} className="cast-card" style={{ background: color }} aria-roledescription="slide" aria-label={`${i + 1} de ${members.length}`}>
                  {photo && <img className="cast-card__img" src={photo} alt={`Foto de ${m.name}`} loading="lazy" />}
                  <div className="cast-card__shade" />
                  <div className="cast-card__body">
                    <h3 className="cast-card__name">{m.name}</h3>
                    {m.role && <div className="cast-card__role" style={{ color }}>{m.role}</div>}
                    {m.bio && <p className="cast-card__bio">{m.bio}</p>}
                    {m.link_url && <SafeLink href={m.link_url} className="cast-card__link">{m.link_label || 'Saiba mais'} ↗</SafeLink>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
