// Seed the RAG chatbot's knowledge base from api/knowledge.json into Supabase.
//
// knowledge.json is the source of truth. The live "chunks" table is
// (id int8 pk, title text, content text, fts tsvector) with no natural key, so
// seeding does a safe full replace: insert the new rows first, then delete the
// rows that existed before. The table is never empty mid-run, and if the insert
// fails nothing is deleted. `fts` is populated by the table itself (generated
// column / trigger), so we only send title + content.
//
// The `slug` in knowledge.json is a human-readable id for the file (uniqueness
// check, diffs); it is NOT stored in the DB.
//
// Usage:
//   node api/seed-knowledge.js            # replace the table with the file
//   node api/seed-knowledge.js --dry-run  # show what would change, write nothing
//   node api/seed-knowledge.js --inspect  # print the table's columns, then exit
//
// Requires env (same .env the API uses):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Optional:
//   KNOWLEDGE_TABLE  (default: chunks)

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = process.env.KNOWLEDGE_TABLE || 'chunks';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const INSPECT = args.has('--inspect');
const EXPORT = args.has('--export');

const here = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_PATH = path.join(here, 'knowledge.json');

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

async function sb(pathAndQuery, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase ${res.status} on ${init.method || 'GET'} ${pathAndQuery}: ${body}`);
  }
  return res;
}

// Read the target table's real columns from PostgREST's OpenAPI spec (works even
// when the table is empty). Used by --inspect so the seed can match the schema.
async function inspectColumns() {
  const spec = await sb('').then((r) => r.json());
  const def = spec && spec.definitions && spec.definitions[TABLE];
  if (!def || !def.properties) {
    fail(`Table "${TABLE}" not found via PostgREST. Check KNOWLEDGE_TABLE / the service key.`);
  }
  console.log(`\nColumns on "${TABLE}":`);
  for (const [name, meta] of Object.entries(def.properties)) {
    const pk = /primary key/i.test(meta.description || '') ? '  [pk]' : '';
    console.log(`  · ${name} — ${meta.format || meta.type || '?'}${pk}`);
  }
  console.log('');
}

// Snapshot the live table to a timestamped JSON file so any replace is reversible.
// Returns the file path, or null if the table is empty.
async function backupTable(existingRows) {
  if (!existingRows.length) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(here, `knowledge.backup-${stamp}.json`);
  await writeFile(file, JSON.stringify(existingRows, null, 2) + '\n', 'utf8');
  return file;
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (set them in .env).');
  }

  if (INSPECT) {
    await inspectColumns();
    return;
  }

  if (EXPORT) {
    const live = await sb(`${TABLE}?select=id,title,content`).then((r) => r.json());
    const file = await backupTable(live);
    console.log(file ? `✓ Exported ${live.length} row(s) → ${file}` : `Table "${TABLE}" is empty; nothing to export.`);
    return;
  }

  // 1. Load and validate the corpus.
  let rows;
  try {
    rows = JSON.parse(await readFile(KNOWLEDGE_PATH, 'utf8'));
  } catch (e) {
    fail(`Could not read/parse ${KNOWLEDGE_PATH}: ${e.message}`);
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    fail('knowledge.json must be a non-empty array of { slug, title, content }.');
  }

  const seen = new Set();
  rows.forEach((r, i) => {
    for (const k of ['slug', 'title', 'content']) {
      if (typeof r[k] !== 'string' || !r[k].trim()) {
        fail(`Entry ${i} is missing a non-empty "${k}".`);
      }
    }
    if (seen.has(r.slug)) fail(`Duplicate slug "${r.slug}" in knowledge.json.`);
    seen.add(r.slug);
  });

  // Only title + content go to the DB; fts is generated, id is auto.
  const payload = rows.map((r) => ({ title: r.title.trim(), content: r.content.trim() }));

  console.log(`Corpus: ${payload.length} chunk(s) from knowledge.json → table "${TABLE}"`);

  // 2. Capture the rows that exist now (backed up, then deleted after inserts land).
  const existing = await sb(`${TABLE}?select=id,title,content`).then((r) => r.json());
  const oldIds = existing.map((r) => r.id);

  if (DRY_RUN) {
    console.log(`\n[dry run] would insert ${payload.length} new row(s):`);
    rows.forEach((r) => console.log(`  · ${r.slug} — ${r.title}`));
    console.log(
      oldIds.length
        ? `[dry run] would back up, then delete, ${oldIds.length} existing row(s).`
        : '[dry run] table is currently empty; nothing to delete.'
    );
    console.log('\nNothing was written.');
    return;
  }

  // 3. Back up the current rows before touching anything, so the replace is reversible.
  const backup = await backupTable(existing);
  if (backup) console.log(`✓ Backed up ${existing.length} existing row(s) → ${backup}`);

  // 4. Insert the new rows first (table is never empty mid-run).
  await sb(TABLE, {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(payload)
  });
  console.log(`✓ Inserted ${payload.length} chunk(s).`);

  // 5. Delete the previously-existing rows.
  if (oldIds.length) {
    const list = oldIds.join(',');
    await sb(`${TABLE}?id=in.(${list})`, { method: 'DELETE' });
    console.log(`✓ Removed ${oldIds.length} old chunk(s).`);
  }

  console.log('\nDone. The knowledge base now mirrors knowledge.json.');
}

main().catch((e) => fail(e.message));
