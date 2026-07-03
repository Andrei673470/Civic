# Como usar estes arquivos

## O que você recebeu
- `api/auth/facebook/callback.js` → rota de login do Facebook
- `api/webhook.js` → rota do WhatsApp Business
- `.env.example` → modelo das senhas/chaves que você precisa preencher

## Passo 1 — Subir na Vercel

1. Crie uma conta grátis em https://vercel.com (pode entrar com GitHub)
2. Se ainda não tem, crie uma conta em https://github.com e crie um repositório novo
3. Suba esta pasta inteira (`meta-integration`) para esse repositório
4. Na Vercel, clique em **"Add New Project"** e selecione esse repositório
5. Clique em **Deploy** (não precisa mudar nenhuma configuração)

## Passo 2 — Conectar seu domínio

1. No painel da Vercel, vá em **Settings > Domains**
2. Adicione `pedrosomultimarcassjp.site`
3. A Vercel vai te mostrar registros DNS (tipo A ou CNAME) — copie e cole isso
   no painel onde você comprou o domínio (Registro.br, GoDaddy, Hostinger etc.)
4. Espere alguns minutos até o domínio propagar

## Passo 3 — Preencher as variáveis de ambiente

1. No painel da Vercel, vá em **Settings > Environment Variables**
2. Adicione as 3 variáveis do arquivo `.env.example` com os valores reais:
   - `FACEBOOK_APP_ID` e `FACEBOOK_APP_SECRET` → pegue em developers.facebook.com,
     no seu app, em "Configurações > Básico"
   - `WHATSAPP_VERIFY_TOKEN` → invente uma senha qualquer (ex: `pedro2026`)
3. Clique em **Redeploy** para aplicar

## Passo 4 — Cadastrar as URLs na Meta

Depois do domínio conectado, suas URLs finais serão:

- **Facebook Login (Redirect URI):**
  `https://pedrosomultimarcassjp.site/api/auth/facebook/callback`

- **WhatsApp (Callback URL):**
  `https://pedrosomultimarcassjp.site/api/webhook`

- **WhatsApp (Verify Token):**
  o mesmo valor que você colocou em `WHATSAPP_VERIFY_TOKEN`

Cole essas URLs nos campos correspondentes no painel da Meta e clique em
"Verificar e Salvar" (Verify and Save).

## Dúvidas comuns

- **"Deu erro 404 na URL"** → o domínio ainda não propagou, ou o deploy falhou.
  Espere um pouco e teste de novo.
- **"A Meta não aceita minha URL"** → confira se está exatamente igual
  (com `https://`, sem barra `/` sobrando no final) em ambos os lugares.
