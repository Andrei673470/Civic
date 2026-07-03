// Rota: https://pedrosomultimarcassjp.site/api/webhook
// Essa é a URL que você vai cadastrar no campo "Callback URL" do WhatsApp na Meta

export default async function handler(req, res) {
  // ─────────────────────────────────────────────
  // PARTE 1: Verificação inicial (a Meta chama isso 1 vez, via GET)
  // ─────────────────────────────────────────────
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Confere se o token bate com o que você definiu (veja .env.example)
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log("Webhook verificado com sucesso!");
      return res.status(200).send(challenge); // devolve o número que a Meta mandou
    }

    return res.status(403).send("Token de verificação inválido.");
  }

  // ─────────────────────────────────────────────
  // PARTE 2: Recebendo mensagens de verdade (via POST)
  // ─────────────────────────────────────────────
  if (req.method === "POST") {
    const body = req.body;

    // Estrutura que a Meta envia quando chega uma mensagem
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];

    if (message) {
      const from = message.from; // número de quem mandou
      const text = message.text?.body; // texto da mensagem
      console.log(`Mensagem recebida de ${from}: ${text}`);

      // Aqui você pode: salvar no banco, responder automaticamente, etc.
    }

    // Sempre responda 200 rápido, senão a Meta acha que falhou
    return res.status(200).send("OK");
  }

  return res.status(405).send("Método não permitido.");
}
