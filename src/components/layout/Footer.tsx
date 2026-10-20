import { Link } from 'react-router-dom';
import { useTexts } from '../../hooks/useTexts';
import { EditButton } from '../ui/EditButton';

export function Footer({ adminMode = false }: { adminMode?: boolean }) {
  const t = useTexts();
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <EditButton section="rodape" />
      <div className="container footer__inner">
        <div>{t('footer')}</div>
        <div className="footer__links">
          <Link to="/privacidade">Política de Privacidade</Link>
          {adminMode ? <Link to="/">← Voltar ao site</Link> : <Link to="/admin">Área do movimento (admin)</Link>}
        </div>
      </div>
    </footer>
  );
}
