import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { useTexts } from '../hooks/useTexts';
import { useLoad } from '../hooks/useLoad';
import { EditButton } from '../components/ui/EditButton';
import { fetchHistoryYears } from '../services/historyService';
import { accentColor, formatDateBR } from '../utils/format';
import { safeUrl } from '../utils/url';

/** Seção "História" da página inicial: atalho para a linha do tempo por ano + notícias recentes. */
export function Stories() {
  const { content } = useContent();
  const t = useTexts();
  const years = useLoad(fetchHistoryYears, []);

  const news = useMemo(
    () => (content?.posts ?? []).filter((p) => p.published && p.category === 'Notícia').sort((a, b) => b.date.localeCompare(a.date)),
    [content],
  );
  const [first, ...rest] = news;
  const firstImg = safeUrl(first?.image_url);

  return (
    <section id="historia" className="section" aria-labelledby="historia-title">
      <EditButton section="historia" />
      <div className="container">
        <div className="kicker kicker--magenta">{t('historiaKicker')}</div>
        <h2 id="historia-title" className="h2">{t('historiaTitle')}</h2>

        {years.data && years.data.length > 0 && (
          <div className="timeline-teaser">
            <p className="lead">Postagens, filipetas e clipagens de cada temporada, em ordem cronológica.</p>
            <ul className="year-chips" aria-label="Anos da História">
              {years.data.map((y, i) => (
                <li key={y.year}><Link to={`/historia/${y.year}`} className="year-chip" style={{ background: accentColor(i) }}>{y.year}</Link></li>
              ))}
            </ul>
            <Link to="/historia" className="btn btn--outline">Ver toda a História →</Link>
          </div>
        )}

        {first && (
          <>
            <h3 className="media__group-title">Notícias</h3>
            <article className="post-hero">
              {firstImg && <img className="post-hero__img" src={firstImg} alt="" loading="lazy" />}
              <div className="post-hero__shade" />
              <div className="post-hero__body">
                <div className="post-hero__meta">Notícia · {formatDateBR(first.date)}</div>
                <h3 className="post-hero__title">{first.title}</h3>
                {first.excerpt && <p className="post-hero__excerpt">{first.excerpt}</p>}
              </div>
            </article>
            <div className="grid-cards">
              {rest.map((p) => {
                const img = safeUrl(p.image_url);
                return (
                  <article key={p.id} className="post-card">
                    <div className="post-card__thumb" style={{ background: 'var(--color-pink)' }}>
                      {img && <img src={img} alt="" loading="lazy" />}
                    </div>
                    <div className="post-card__body">
                      <div className="chip" style={{ background: 'var(--color-pink)' }}>Notícia · {formatDateBR(p.date)}</div>
                      <h3 className="post-card__title">{p.title}</h3>
                      {p.excerpt && <p className="post-card__excerpt">{p.excerpt}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
