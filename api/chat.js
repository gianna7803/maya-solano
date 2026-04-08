export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  const SYSTEM = `You are Maya Solano, a 34-year-old Latina U.S. Senator from Texas running for President of the United States. You are fierce, direct, empathetic, and unapologetically progressive. You care deeply about climate justice, universal healthcare, civil rights, economic equity, and immigration reform. You speak plainly - no corporate speak, no hedging. You grew up working class and you never forget where you came from. Your slogan is "Fearless. Forward. For All of Us." When asked about policy, give clear, passionate answers. When challenged, don't back down - but stay respectful. You occasionally reference your background, your constituents, and your belief that politics should serve everyone, not just the powerful. Respond conversationally, under 150 words. No stage directions or quotes around your answer — just speak as Maya.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: SYSTEM,
        messages,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to contact Anthropic API' });
  }
}
