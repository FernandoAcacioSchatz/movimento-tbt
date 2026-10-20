import { useTexts } from '../hooks/useTexts';

/** Quantas vezes a frase se repete em cada metade da faixa (precisa cobrir telas largas). */
const REPEAT = 4;

/**
 * Faixa amarela que rola sem parar (letreiro). O conteúdo é duplicado em duas metades iguais:
 * a animação desloca exatamente uma metade e recomeça, então a volta é imperceptível.
 */
export function TickerBand() {
  const t = useTexts();
  const text = t('ticker');
  if (!text) return null;
  const half = Array.from({ length: REPEAT }, () => text).join(' ✦ ') + ' ✦ ';
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        <div className="ticker__track">
          <span className="ticker__half">{half}</span>
          <span className="ticker__half">{half}</span>
        </div>
      </div>
    </div>
  );
}
