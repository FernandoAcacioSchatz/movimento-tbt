import { useEffect, useRef, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useTexts } from '../hooks/useTexts';
import { EditButton } from '../components/ui/EditButton';
import { SafeLink } from '../components/ui/SafeLink';
import { accentColor } from '../utils/format';
import { safeUrl } from '../utils/url';

export function Cast() {
  const { content } = useContent();
  const t = useTexts();
  const members = content?.members ?? [];

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
  // proporção (largura/altura) de cada foto já carregada: a coluna da foto do painel assume essa
  // proporção, então qualquer foto (deitada, quadrada, selfie 9:16) aparece inteira, sem corte
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const natural = (currentPhoto && ratios[currentPhoto]) || 3 / 4;
  // o painel é sempre em pé (foto à esquerda, texto ao lado): foto deitada ou quadrada vai numa
  // moldura 3:4 enquadrada no rosto, igual ao cartão da grade (ver .member__photo--crop)
  const crop = natural >= 1;
  const ratio = crop ? 3 / 4 : natural;

  return (
    <section id="integrantes" className="section" aria-labelledby="elenco-title">
      <EditButton section="integrantes" />
      <div className="container">
        <div className="kicker kicker--orange">{t('elencoKicker')}</div>
        <div className="section__head" style={{ marginBottom: 'var(--space-6)' }}>
          <h2 id="elenco-title" className="h2">{t('elencoTitle')}</h2>
        </div>
        {members.length === 0 ? (
          <p className="empty">Em breve.</p>
        ) : (
          <ul className="cast-grid" aria-label="Integrantes do movimento">
            {members.map((m, i) => {
              const color = accentColor(i);
              const photo = safeUrl(m.photo_url);
              return (
                <li key={m.id} className="cast-card">
                  <button
                    type="button"
                    className="cast-card__open"
                    onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
                    aria-haspopup="dialog"
                  >
                    <span className="cast-card__photo" style={{ background: color }}>
                      {photo && <img className="cast-card__img" src={photo} alt={`Foto de ${m.name}`} loading="lazy" />}
                    </span>
                    <span className="cast-card__body">
                      <span className="cast-card__info">
                        <span className="cast-card__name">{m.name}</span>
                        {m.role && <span className="cast-card__role">{m.role}</span>}
                      </span>
                      <span className="cast-card__more" style={{ background: color }}>Conhecer ＋</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <dialog
        ref={dialog}
        className={currentPhoto ? 'member member--side' : 'member'}
        style={{ '--photo-ratio': ratio } as React.CSSProperties}
        aria-labelledby="member-name"
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
      >
        {current && (
          <div className="member__inner" style={{ borderColor: currentColor }}>
            <button type="button" className="arrow arrow--pause member__close" onClick={() => dialog.current?.close()} aria-label="Fechar">✕</button>
            {currentPhoto && (
              <div className={crop ? 'member__photo member__photo--crop' : 'member__photo'}>
                <img className="member__photo-bg" src={currentPhoto} alt="" aria-hidden="true" />
                <img key={currentPhoto} className="member__photo-img" src={currentPhoto} alt={`Foto de ${current.name}`}
                  onLoad={(e) => {
                    const i = e.currentTarget;
                    if (i.naturalWidth && i.naturalHeight) setRatios((r) => ({ ...r, [currentPhoto]: i.naturalWidth / i.naturalHeight }));
                  }} />
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
