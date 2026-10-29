import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_TEXT } from '../../assets/brand';
import { onSectionLinkClick } from '../../utils/scroll';
import { safeUrl } from '../../utils/url';
import { useContent } from '../../hooks/useContent';

const MENU = [
  ['Início', 'inicio'], ['Sobre', 'sobre'], ['Agenda', 'agenda'], ['História', 'historia'],
  ['Mídias', 'na-midia'], ['Assista & ouça', 'midias'], ['Integrantes', 'integrantes'], ['Contato', 'contato'],
] as const;

export function Header({ base = '' }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { content } = useContent();
  // Logo trocada pelo admin (Editar → Início); sem ela, a original do site.
  const customLogo = safeUrl(content?.texts.logoTopo, { httpsOnly: true });
  // Nas páginas sem as seções (ex.: /privacidade) os links levam de volta à página inicial.
  const onHome = pathname === (base || '/') || pathname === `${base}/`;
  const to = (id: string) => (onHome ? `#${id}` : `${base}/#${id}`);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to={`${base}/#inicio`} className="header__logo" aria-label="Movimento TBT — início">
          {customLogo
            ? <img src={customLogo} alt="Logo Movimento Temporada Blumenauense de Teatro" height={LOGO_TEXT.height} />
            : <img src={LOGO_TEXT.src} srcSet={LOGO_TEXT.srcSet} alt="Logo Movimento Temporada Blumenauense de Teatro" width={LOGO_TEXT.width} height={LOGO_TEXT.height} />}
        </Link>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="menu-principal" onClick={() => setOpen((o) => !o)}>
          {open ? 'Fechar' : 'Menu'}
        </button>
        <nav id="menu-principal" className="nav" aria-label="Principal" data-open={open}>
          {MENU.map(([label, id]) => (
            onHome
              ? <a key={id} href={to(id)} onClick={(e) => { setOpen(false); onSectionLinkClick(e, id); }}>{label}</a>
              : <Link key={id} to={to(id)} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </nav>
        {onHome
          ? <a className="btn btn--magenta header__cta" href={to('agenda')} onClick={(e) => onSectionLinkClick(e, 'agenda')}>Ver agenda →</a>
          : <Link className="btn btn--magenta header__cta" to={to('agenda')}>Ver agenda →</Link>}
      </div>
    </header>
  );
}
