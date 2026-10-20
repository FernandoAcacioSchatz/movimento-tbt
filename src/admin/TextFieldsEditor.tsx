import { useState } from 'react';
import { saveTexts } from '../services/contentService';
import { useContent } from '../hooks/useContent';
import { textValueSchema } from '../schemas/resourceSchemas';
import { safeUrl } from '../utils/url';
import { URL_TEXT_KEYS, type TextField } from './config';

export function TextFieldsEditor({ fields, onMessage }: { fields: TextField[]; onMessage: (m: string, ok: boolean) => void }) {
  const { content, reload } = useContent();
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.key, content?.texts[f.key] ?? ''])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.key] ?? '';
      const r = textValueSchema.safeParse(v);
      if (!r.success) nextErrors[f.key] = r.error.issues[0]?.message ?? 'Valor inválido.';
      if (URL_TEXT_KEYS.has(f.key) && v.trim() !== '' && !safeUrl(v)) nextErrors[f.key] = 'Use um endereço que comece com https://';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) { onMessage('Confira os campos destacados.', false); return; }
    setSaving(true);
    try {
      await saveTexts(values);
      await reload();
      onMessage('Textos salvos. O site já foi atualizado.', true);
    } catch (err) {
      onMessage(err instanceof Error ? err.message : 'Não foi possível salvar.', false);
    } finally {
      setSaving(false);
    }
  };

  if (fields.length === 0) return null;
  return (
    <form className="ed-card" onSubmit={(e) => void save(e)} aria-label="Textos da seção">
      <div className="ed-card__title">Textos</div>
      {fields.map((f) => (
        <div className="field" key={f.key}>
          <label htmlFor={`tx-${f.key}`}>{f.label}</label>
          {f.kind === 'i' ? (
            <input id={`tx-${f.key}`} className="input" type="text" value={values[f.key] ?? ''} aria-invalid={!!errors[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          ) : (
            <textarea id={`tx-${f.key}`} className="input" rows={f.kind === 'A' ? 7 : 3} value={values[f.key] ?? ''} aria-invalid={!!errors[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          )}
          {errors[f.key] && <span className="field__error" role="alert">{errors[f.key]}</span>}
        </div>
      ))}
      <div><button type="submit" className="btn btn--magenta" disabled={saving}>{saving ? 'Salvando…' : 'Salvar textos'}</button></div>
    </form>
  );
}
