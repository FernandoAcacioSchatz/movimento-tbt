import { useEffect, useRef, useState } from 'react';
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

  // cartão aberto no painel (índice); o painel mostra a bio completa e o link
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (open !== null && d && !d.open) d.showModal?.();
  }, [open]);

  const current = open === null ? null : members[open];
  const currentColor = open === null ? undefined : accentColor(open);
  const currentPhoto = current ? safeUrl(current.photo_url) : null;

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
          <div ref={setTrack} className="cast-track noscroll" onScroll={onScroll}>
            {members.map((m, i) => {
              const color = accentColor(i);
              const photo = safeUrl(m.photo_url);
              return (
                <article key={m.id} className="cast-card" style={{ background: color }} aria-roledescription="slide" aria-label={`${i + 1} de ${members.length}`}>
                  <button
                    type="button"
                    className="cast-card__open"
                    onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
                    aria-haspopup="dialog"
                  >
                    {photo && <img className="cast-card__img" src={photo} alt={`Foto de ${m.name}`} loading="lazy" />}
                    <span className="cast-card__shade" />
                    <span className="cast-card__body">
                      <span className="cast-card__name">{m.name}</span>
                      {m.role && <span className="cast-card__role" style={{ color }}>{m.role}</span>}
                      <span className="cast-card__more">Conhecer ＋</span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <dialog
        ref={dialog}
        className="member"
        aria-labelledby="member-name"
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
      >
        {current && (
          <div className="member__inner" style={{ borderColor: currentColor }}>
            <button type="button" className="arrow arrow--pause member__close" onClick={() => dialog.current?.close()} aria-label="Fechar">✕</button>
            {currentPhoto && (
              <div className="member__photo" style={{ background: currentColor }}>
                <img src={currentPhoto} alt={`Foto de ${current.name}`} />
              </div>
            )}
            <div className="member__body">
              <h3 id="member-name" className="member__name">{current.name}</h3>
              {current.role && <p className="member__role">{current.role}</p>}
              {current.bio && <p className="member__bio">{current.bio}</p>}
              {current.link_url && (
                <SafeLink href={current.link_url} className="btn btn--magenta member__link">{current.link_label || 'Saiba mais'} ↗</SafeLink>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
