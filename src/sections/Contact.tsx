import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useTexts } from '../hooks/useTexts';
import { EditButton } from '../components/ui/EditButton';
import { SafeLink } from '../components/ui/SafeLink';
import { contactSchema, type ContactFormValues } from '../schemas/contactSchema';
import { sendContactMessage } from '../services/contactService';
import { CONTACT_SUBJECTS } from '../types/content';

const SOCIALS = [
  ['Instagram', 'socInstagram', 'var(--color-pink)'],
  ['YouTube', 'socYoutube', 'var(--color-yellow)'],
  ['Spotify', 'socSpotify', 'var(--color-teal)'],
  ['SoundCloud', 'socSoundcloud', 'var(--color-orange)'],
] as const;

export function Contact() {
  const t = useTexts();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: CONTACT_SUBJECTS[0], message: '', consent: false, website: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    // Robô preencheu o campo-armadilha: finge sucesso e não envia nada.
    if (values.website) { setSent(true); return; }
    try {
      await sendContactMessage({ name: values.name, email: values.email, subject: values.subject, message: values.message });
      setSent(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Não foi possível enviar sua mensagem agora.');
    }
  };

  const err = (key: keyof ContactFormValues) => errors[key]?.message as string | undefined;

  return (
    <section id="contato" className="section" aria-labelledby="contato-title">
      <EditButton section="contato" />
      <div className="container contact">
        <div className="contact__info">
          <div className="kicker kicker--teal">{t('contatoKicker')}</div>
          <h2 id="contato-title" className="h2">{t('contatoTitle')}</h2>
          <p className="lead">{t('contatoText')}</p>
          <div className="socials">
            {SOCIALS.map(([label, key, color]) => (
              <SafeLink key={key} href={t(key)} className="social" style={{ background: color }}>{label} ↗</SafeLink>
            ))}
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulário de contato">
          {sent ? (
            <div className="form__ok" role="status">
              <h3>Obrigado pelo envio!</h3>
              <p>Recebemos sua mensagem e respondemos em breve.</p>
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor="f-nome">Nome</label>
                <input id="f-nome" className="input" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'f-nome-err' : undefined} {...register('name')} />
                {errors.name && <span id="f-nome-err" className="field__error" role="alert">{err('name')}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-email">E-mail</label>
                <input id="f-email" className="input" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'f-email-err' : undefined} {...register('email')} />
                {errors.email && <span id="f-email-err" className="field__error" role="alert">{err('email')}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-assunto">Assunto</label>
                <select id="f-assunto" className="input" aria-invalid={!!errors.subject} {...register('subject')}>
                  {CONTACT_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.subject && <span className="field__error" role="alert">{err('subject')}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-msg">Mensagem</label>
                <textarea id="f-msg" className="input" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'f-msg-err' : undefined} {...register('message')} />
                {errors.message && <span id="f-msg-err" className="field__error" role="alert">{err('message')}</span>}
              </div>

              {/* Campo-armadilha: invisível para pessoas */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="f-site">Não preencha este campo</label>
                <input id="f-site" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
              </div>

              <div className="field">
                <label className="check" htmlFor="f-consent">
                  <input id="f-consent" type="checkbox" aria-invalid={!!errors.consent} {...register('consent')} />
                  <span>Li e aceito a <Link to="/privacidade">Política de Privacidade</Link> e autorizo o uso dos meus dados para responder esta mensagem.</span>
                </label>
                {errors.consent && <span className="field__error" role="alert">{err('consent')}</span>}
              </div>

              {serverError && <div className="form__error" role="alert">{serverError}</div>}
              <button type="submit" className="btn btn--magenta btn--lg" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
