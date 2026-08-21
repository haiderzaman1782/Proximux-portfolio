import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // info.proximux@gmail.com
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Lead from PROXIMUX: ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Project Details:
      ${message}
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #000; padding: 24px; text-align: center;">
          <h1 style="color: #c8f135; margin: 0; font-size: 24px;">PROXIMUX Lead</h1>
        </div>
        <div style="padding: 32px; background-color: #fff; color: #1a202c;">
          <h2 style="margin-top: 0; border-bottom: 2px solid #edf2f7; padding-bottom: 12px;">New Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #3182ce;">${email}</a></p>
          <div style="margin-top: 24px; padding: 16px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #c8f135;">
            <p style="margin-top: 0; font-weight: bold; color: #4a5568;">Project Details:</p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 32px; font-size: 14px; color: #718096; text-align: center; border-top: 1px solid #edf2f7; pt: 16px;">
            This inquiry was sent from your website contact form.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// --- RAG chatbot: full-text retrieve from Supabase + answer with an OpenAI-compatible LLM ---
// Works with Groq (api.groq.com, gsk_ keys) OR xAI Grok (api.x.ai, xai_ keys) — just set the env vars.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LLM_API_URL = process.env.LLM_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_MODEL = process.env.LLM_MODEL || 'llama-3.1-8b-instant';

const CHAT_SYSTEM = `You are the assistant on Proximux's website. Proximux is a two-founder AI engineering and software studio.
Rules:
- Answer ONLY using the numbered CONTEXT below. Do not use outside knowledge.
- Cite the context you use inline, like [1] or [2].
- If the CONTEXT does not contain the answer, say you don't have that detail and suggest booking a discovery call at proximux.online. Never invent facts, prices, or timelines.
- Speak as Proximux ("we"). Be concise and friendly — 2 to 4 sentences.`;

const CHAT_REFUSAL = "I don't have that detail about Proximux. The best way to get a precise answer is to book a 30-minute discovery call at proximux.online — you'll talk directly to an engineer.";

app.post('/api/chat', async (req, res) => {
  const question = String((req.body && req.body.question) || '').trim().slice(0, 500);
  if (!question) return res.status(400).json({ error: 'Ask a question.' });
  if (!SUPABASE_URL || !SUPABASE_KEY || !LLM_API_KEY) {
    return res.status(500).json({ error: 'Chatbot is not configured (missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or LLM_API_KEY).' });
  }

  const t0 = Date.now();
  try {
    // 1. Retrieve relevant chunks (Postgres full-text search via Supabase RPC).
    const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_chunks`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query_text: question, match_count: 5 })
    });
    if (!rpc.ok) throw new Error(`Supabase ${rpc.status}: ${await rpc.text()}`);
    const hits = await rpc.json();

    if (!Array.isArray(hits) || hits.length === 0) {
      return res.json({ answer: CHAT_REFUSAL, sources: [], latency_ms: Date.now() - t0, grounded: false });
    }

    // 2. Generate a grounded, cited answer.
    const context = hits.map((h, i) => `[${i + 1}] (${h.title}) ${h.content}`).join('\n\n');
    const llmRes = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${LLM_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLM_MODEL,
        temperature: 0.2,
        max_tokens: 500,
        messages: [
          { role: 'system', content: CHAT_SYSTEM },
          { role: 'user', content: `CONTEXT:\n${context}\n\nQUESTION: ${question}` }
        ]
      })
    });
    if (!llmRes.ok) throw new Error(`LLM ${llmRes.status}: ${await llmRes.text()}`);
    const data = await llmRes.json();
    const answer = ((data.choices && data.choices[0] && data.choices[0].message.content) || '').trim();

    res.json({
      answer,
      sources: hits.map((h, i) => ({ n: i + 1, title: h.title, score: Math.round((h.score || 0) * 1000) / 1000 })),
      latency_ms: Date.now() - t0,
      grounded: true
    });
  } catch (e) {
    console.error('Chat error:', e);
    res.status(500).json({ error: 'Something went wrong answering that.', detail: String((e && e.message) || e) });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
