import { useTexts } from '../hooks/useTexts';

export function TickerBand() {
  const t = useTexts();
  const text = t('ticker');
  if (!text) return null;
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        <span>{`${text} ✦ ${text} ✦ ${text}`}</span>
      </div>
    </div>
  );
}
