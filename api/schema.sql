-- Knowledge base schema for the "Ask Proximux" RAG chatbot.
--
-- This mirrors the live "chunks" table and the match_chunks function the chat
-- API (index.js) and the seed script (seed-knowledge.js) use. It is provided so
-- the schema is documented and reproducible; the live table already exists.
--
-- Retrieval is Postgres FULL-TEXT SEARCH (websearch_to_tsquery), not vector
-- embeddings. The chat API OR-joins the question words and calls
--   match_chunks(query_text, match_count) -> (title, content, score).

create table if not exists public.chunks (
  id      bigint generated always as identity primary key,
  title   text not null,
  content text not null,
  fts     tsvector generated always as (
            to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
          ) stored
);

create index if not exists chunks_fts_idx on public.chunks using gin (fts);

-- Retrieval function used by POST /api/chat.
create or replace function public.match_chunks(query_text text, match_count int default 8)
returns table (title text, content text, score real)
language sql
stable
as $$
  select
    c.title,
    c.content,
    ts_rank(c.fts, websearch_to_tsquery('english', query_text)) as score
  from public.chunks c
  where c.fts @@ websearch_to_tsquery('english', query_text)
  order by score desc
  limit match_count;
$$;
