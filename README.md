# Proximux Portfolio

Marketing site for **Proximux**, a two-founder software engineering studio. Built with Vite + React and deployed on Vercel. It ships two live product demos: **Ask Proximux** (a Retrieval-Augmented Generation chatbot that answers only from Proximux's own content) and a BERT/LoRA sentiment model.

## Stack

- **Frontend:** Vite 6, React 18, React Router 7, Tailwind CSS v4, MUI, `motion`, `next-themes` (Kiln light / Graphite dark themes)
- **Backend:** Express serverless function (`api/index.js`) running on Vercel
- **Knowledge base:** Supabase (Postgres full-text search)
- **LLM:** Any OpenAI-compatible endpoint — Groq (`llama-3.1-8b-instant`) or xAI Grok
- **Email:** Nodemailer over Gmail (contact form leads)

## Running locally

```bash
npm i          # install dependencies
npm run dev    # Vite dev server (frontend)
npm run server # Express API on :5050 (nodemon) — needed for the chatbot + contact form
```

The frontend calls the API at same-origin `/api` by default. To point it elsewhere in dev, set `VITE_RAG_API_URL`.

## Environment variables

Create a `.env` (used by `api/index.js`; never commit it):

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | Gmail address that sends/receives contact-form leads |
| `EMAIL_PASS` | Gmail **App Password** (not the account password) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key, used server-side for the `match_chunks` RPC |
| `LLM_API_KEY` | API key for the LLM host (Groq `gsk_…` or xAI `xai_…`) |
| `LLM_API_URL` | Chat-completions endpoint. Default: `https://api.groq.com/openai/v1/chat/completions` |
| `LLM_MODEL` | Model id. Default: `llama-3.1-8b-instant` |
| `VITE_RAG_API_URL` | *(frontend, optional)* Override the API base. Default: `/api` |

## API

Both endpoints live in [`api/index.js`](api/index.js).

- `POST /api/contact` — `{ name, email, message }`. Emails the lead via Nodemailer.
- `POST /api/chat` — `{ question, history }`. The RAG chatbot (below).

## The RAG chatbot ("Ask Proximux")

The floating widget ([`src/app/components/ChatWidget.tsx`](src/app/components/ChatWidget.tsx)) is a live demo of the RAG product Proximux builds for clients. Every factual answer is grounded in retrieved company content; it refuses to answer from outside knowledge.

### Request flow (`POST /api/chat`)

1. **Small talk shortcut.** Greetings, thanks, and "who are you" (≤5 words) are answered instantly with canned replies — no search, no LLM call. See `smallTalkReply()`.
2. **Build the search query.** Words from the previous user turn plus the current question are OR-joined into a `websearch_to_tsquery`, so follow-ups ("name all of them") still carry keywords and partial matches surface.
3. **Retrieve.** Calls the Supabase RPC `match_chunks(query_text, match_count: 8)` — Postgres full-text search over the knowledge base. Returns the top chunks as `{ title, content, score }`.
4. **No hits → refuse.** If nothing matches, it returns a fixed "book a call" message rather than guessing.
5. **Generate.** The retrieved chunks become a numbered `CONTEXT` block. The LLM is called with the `CHAT_SYSTEM` prompt + recent history + `CONTEXT` and the question. `temperature: 0.2`, grounded, no citation markers in the visible answer.
6. **Respond.** `{ answer, sources, latency_ms, grounded }`. `sources` carries the chunk titles and scores for the UI.

> **Note on the diagram:** the marketing diagram ([`RagDiagram.tsx`](src/app/components/diagrams/RagDiagram.tsx)) shows a vector-DB / embedding pipeline. The current implementation uses **Postgres full-text search** (`websearch_to_tsquery`), not vector embeddings. Retrieval quality comes from full-text ranking, not semantic similarity.

### The system prompt

`CHAT_SYSTEM` in `api/index.js` defines the persona, grounding rules, guardrails, and hard facts (two founders, four disciplines: RAG/knowledge engines, AI voice agents, cross-platform mobile, full-stack web). Edit it there to change how the bot behaves.

### Updating the knowledge base

The corpus is version-controlled in this repo and synced to Supabase:

- **[`api/knowledge.json`](api/knowledge.json)** — the source of truth. An array of `{ slug, title, content }` chunks. Edit this to change what the bot knows. (`slug` is a human-readable id for the file; only `title` + `content` are stored.)
- **[`api/seed-knowledge.js`](api/seed-knowledge.js)** — replaces the `chunks` table with the file. It inserts the new rows first, then deletes the old ones, so the table is never empty mid-run.
- **[`api/schema.sql`](api/schema.sql)** — the `chunks` table + `match_chunks` function the API and seed use, for reference/reproducibility.

Workflow: edit `knowledge.json`, then run

```bash
npm run seed -- --dry-run   # preview the replace, writes nothing
npm run seed                # apply
npm run seed -- --inspect   # print the table's columns and exit
```

Needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`; set `KNOWLEDGE_TABLE` to override the table name (default `chunks`). Note the `--` before the flag, so npm passes it to the script.

## Deployment

Deployed on Vercel. [`vercel.json`](vercel.json) rewrites `/api/*` to the Express function and everything else to the SPA `index.html`. Set all environment variables above in the Vercel project settings.
