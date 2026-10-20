import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { ServiceError } from './errors';

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  // Mensagem genérica de propósito: não revela se o e-mail existe.
  if (error) throw new ServiceError('E-mail ou senha incorretos.');
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(callback: (session: Session | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

/** Pergunta ao banco se o usuário logado é administrador (a decisão final é sempre do servidor). */
export async function checkIsAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin');
  return !error && data === true;
}
