/** Caminho de arquivo do próprio site (pasta public/images), ex.: "/images/acervo/foto.webp". */
export const LOCAL_IMAGE_RE = /^\/images\/[\w./-]+$/;

/**
 * Só deixa passar endereços http(s) ou imagens do próprio site (/images/…). Bloqueia `javascript:`,
 * `data:` e similares, mesmo que algum dado malicioso chegue ao banco.
 */
export function safeUrl(value: string | null | undefined, opts: { httpsOnly?: boolean } = {}): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (LOCAL_IMAGE_RE.test(v) && !v.includes('..')) return v;
  try {
    const url = new URL(v);
    const allowed = opts.httpsOnly ? ['https:'] : ['https:', 'http:'];
    return allowed.includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
