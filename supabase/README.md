# Banco de dados (Supabase) — Movimento TBT

Projeto Supabase: **movimento tbt** (`btzeamyzvltiuslquwhm`, região sa-east-1).
O banco **já está criado e configurado**. Migrações aplicadas (nesta ordem): `schema_base_seguro`, `seed_conteudo_site04`, `endurecer_funcoes_e_politicas`.
Para obter o SQL completo: `supabase db dump --schema public` (CLI do Supabase).

## Tabelas
| Tabela | Leitura pública | Escrita |
|---|---|---|
| site_content (textos) | sim | só admin |
| shows, posts | só `published = true` | só admin (admin também lê os ocultos) |
| members, videos, podcasts, photos | sim | só admin |
| contact_messages | **não** | público só INSERT (limite por tempo); ler/atualizar/excluir só admin |
| admins, audit_log | **não** | admins só via Edge Function / triggers; leitura só admin |

## Camadas de segurança no banco
- RLS ativo em todas as tabelas; políticas `is_admin()` (função SECURITY DEFINER, sem execução para `anon`).
- Restrições CHECK: tamanhos máximos, links apenas `https://`, assuntos de contato permitidos.
- Limite de envios do formulário de contato no próprio banco (anti-spam).
- Trilha de auditoria (`audit_log`) por gatilhos nas tabelas editáveis.
- Storage `site-images`: leitura pública, envio/alteração/exclusão só admin.
- Edge Function `admin-users` (`functions/admin-users/index.ts`): `verify_jwt` + confere se quem chama é admin + CORS restrito + senha ≥ 12 caracteres.

## Criar o primeiro administrador
1. Supabase → **Authentication → Users → Add user → Create new user** (e-mail + senha forte, marque *Auto Confirm User*).
2. No **SQL Editor**, rode (trocando o e-mail):
```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'SEU_EMAIL_AQUI';
```
3. Outros administradores: depois de entrar, use **/admin/administradores** no site.

## Ajustes manuais no painel (a API não permite fazer por aqui)
Authentication → Sign In / Providers → desligue **Allow new users to sign up**.
Authentication → Passwords → mínimo 12, exigir maiúsculas/minúsculas/números, ative **Leaked password protection** (plano Pro) .
Authentication → Rate Limits → mantenha os padrões ou reduza.
Edge Functions → `admin-users` → Secrets: `ALLOWED_ORIGINS` = `https://movimentotbt.art,https://www.movimentotbt.art` (+ domínio provisório de teste, se houver).
