// Rota: https://pedrosomultimarcassjp.site/api/auth/facebook/callback
// Essa é a URL que você vai cadastrar em "Valid OAuth Redirect URIs" na Meta

export default async function handler(req, res) {
  const { code, error } = req.query;

  // Se o usuário cancelou o login ou algo deu errado
  if (error) {
    return res.redirect("/login-erro.html");
  }

  if (!code) {
    return res.status(400).send("Código de autorização não recebido.");
  }

  try {
    // Troca o "code" temporário por um access_token de verdade
    const params = new URLSearchParams({
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: "https://pedrosomultimarcassjp.site/api/auth/facebook/callback",
      code: code,
    });

    const response = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?${params}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Erro ao trocar o code por token:", data.error);
      return res.status(400).send("Erro ao autenticar com o Facebook.");
    }

    // Aqui você já tem o access_token do usuário (data.access_token)
    // Você pode salvar em sessão, banco de dados, cookie, etc.
    console.log("Access token recebido:", data.access_token);

    // Redireciona o usuário para uma página de sucesso no seu site
    return res.redirect("/login-sucesso.html");
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).send("Erro interno ao processar login.");
  }
}
