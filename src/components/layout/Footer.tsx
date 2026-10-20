import { Link } from 'react-router-dom';
import { useTexts } from '../../hooks/useTexts';
import { EditButton } from '../ui/EditButton';
import { todayBR } from '../../utils/dates';

export function Footer({ adminMode = false }: { adminMode?: boolean }) {
  const t = useTexts();
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <EditButton section="rodape" />
      <div className="container footer__inner">
        {/* "© AAAA" sempre com o ano atual, sem precisar editar o texto todo ano */}
        <div>{t('footer').replace(/©\s*\d{4}/, `© ${todayBR().slice(0, 4)}`)}</div>
        <div className="footer__links">
          <Link to="/privacidade">Política de Privacidade</Link>
          {adminMode ? <Link to="/">← Voltar ao site</Link> : <Link to="/admin">Área do movimento (admin)</Link>}
        </div>
      </div>
    </footer>
  );
}
