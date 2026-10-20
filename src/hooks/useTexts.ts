import { useContent } from './useContent';

/** Devolve uma função t("chave") para ler os textos editáveis do site. */
export function useTexts(): (key: string) => string {
  const { content } = useContent();
  return (key: string) => content?.texts[key] ?? '';
}
