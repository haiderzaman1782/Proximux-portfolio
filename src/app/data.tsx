import {
  Database, PhoneCall, Smartphone, Code2,
  Zap, Play, GitBranch, ArrowUpRight,
  Search, FlaskConical, Rocket
} from 'lucide-react';
import { RagDiagram } from './components/diagrams/RagDiagram';
import { VoiceDiagram } from './components/diagrams/VoiceDiagram';
import { MobileDiagram } from './components/diagrams/MobileDiagram';

// NOTE: every ‹...› below is a REAL number or asset you must supply before launch.
// If you don't have it yet, cut the claim — do not estimate.

export const services = [
  {
    title: "Enterprise RAG & Knowledge Engines",
    oneLiner: "Retrieval systems that answer from your data — with citations, not hallucinations.",
    icon: <Database className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--saas-lime)]" />,
    highlight: "p95 <‹200ms› · ‹95%+› grounded · abstains under confidence",
    stack: ["Python", "FastAPI", "Pinecone"],
    overview: "Hybrid retrieval (semantic + keyword + reranking) over your documents, wikis, and databases. Every answer is grounded in retrieved source chunks with inline citations, so your team can verify each response. Low-confidence queries refuse instead of guessing.",
    deliverables: [
      "Ingestion pipeline (PDF · DOCX · HTML · Notion · Confluence · SQL)",
      "Chunking + embedding strategy tuned to your corpus",
      "Hybrid vector search + cross-encoder reranking",
      "Inline citation layer (answer → source span)",
      "Evaluation harness on your own test set",
      "Admin dashboard + ingestion monitoring"
    ],
    fullStack: ["Python", "FastAPI", "Pinecone / pgvector", "OpenAI / Claude", "LangGraph", "Redis"]
  },
  {
    title: "Autonomous AI Voice & Receptionists",
    oneLiner: "Voice agents that answer, qualify, book, and route — 24/7, in natural speech.",
    icon: <PhoneCall className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--saas-lime)]" />,
    highlight: "<‹800ms› voice-to-voice · live CRM write-back · 24/7",
    stack: ["Python", "Twilio", "Deepgram"],
    overview: "End-to-end inbound/outbound voice agents with natural turn-taking and sub-second response. They answer FAQs from your knowledge base, book appointments, write to your CRM live, and hand off to a human with full call context.",
    deliverables: [
      "Telephony integration (Twilio · Vonage · SIP)",
      "Streaming STT → LLM → TTS pipeline",
      "Barge-in / interruption handling (real conversation, not IVR)",
      "Function-calling: bookings, lookups, CRM writes",
      "Live CRM + calendar sync",
      "Call transcripts, summaries, and analytics"
    ],
    fullStack: ["Python", "FastAPI", "Twilio", "Deepgram", "ElevenLabs / OpenAI Realtime", "WebSockets"]
  },
  {
    title: "Cross-Platform Mobile Apps",
    oneLiner: "One codebase. Native performance. Shipped to the App Store and Play Store.",
    icon: <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--saas-lime)]" />,
    highlight: "<‹800ms› p95 API · 60fps UI · offline-first",
    stack: ["React Native", "Expo", "TypeScript"],
    overview: "Production mobile apps in React Native / Expo — offline-first, push-enabled, wired to a typed API. We own the full lifecycle: architecture, build pipeline (EAS), and App Store / Play Store submission.",
    deliverables: [
      "React Native (Expo) app — iOS + Android from one codebase",
      "Typed API client, end-to-end types with the backend",
      "Offline cache + background sync",
      "Push notifications, auth, in-app payments",
      "CI/CD via EAS, over-the-air updates",
      "App Store + Play Store submission & review handling"
    ],
    fullStack: ["React Native", "Expo", "TypeScript", "FastAPI", "Postgres", "EAS"]
  },
  {
    title: "Custom Full-Stack Web Engineering",
    oneLiner: "Typed, tested, observable web apps — from database schema to production deploy.",
    icon: <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--saas-lime)]" />,
    highlight: "typed end-to-end · you own the repo & infra day one",
    stack: ["Python", "FastAPI", "Postgres"],
    overview: "Full-stack web applications on a Python/FastAPI backend and a modern React front end. Typed end-to-end, tested on critical paths, deployed to infrastructure you own from day one.",
    deliverables: [
      "FastAPI backend + Postgres schema & migrations",
      "REST / WebSocket APIs, background jobs & queues",
      "React / Next.js front end",
      "Auth + RBAC, audit logging",
      "Observability (logs, metrics, tracing) + CI/CD + IaC",
      "Repo + infra handover — you own everything"
    ],
    fullStack: ["Python", "FastAPI", "Postgres", "React", "TypeScript", "Docker"]
  }
];

export type Service = typeof services[number];

export const proofCases = [
  {
    mediaType: "demo" as const,
    mediaLabel: "Live RAG demo",
    diagram: <RagDiagram />,
    headline: "Ask ‹400› pages a question. Get a cited answer in ‹XXms›.",
    metrics: ["‹XXms› p95 retrieval", "‹95%+› accuracy on ‹N›-question eval", "Citations on 100% of answers", "‹0› hallucinations in eval"],
    artifacts: [
      { label: "Try the live demo", icon: <Zap size={14} /> },
      { label: "4-min teardown", icon: <Play size={14} /> },
      { label: "Architecture", icon: <GitBranch size={14} /> }
    ]
  },
  {
    mediaType: "audio" as const,
    mediaLabel: "Real call recording",
    diagram: <VoiceDiagram />,
    headline: "Hear it book a real appointment — and sync it to the CRM live.",
    metrics: ["‹XXXms› voice-to-voice", "‹X/X› calls booked", "CRM write in ‹Xs›", "24/7 availability"],
    artifacts: [
      { label: "Play the call", icon: <Play size={14} /> },
      { label: "Call the demo line", icon: <PhoneCall size={14} /> },
      { label: "Call-flow", icon: <GitBranch size={14} /> }
    ]
  },
  {
    mediaType: "video" as const,
    mediaLabel: "App UI walkthrough",
    diagram: <MobileDiagram />,
    headline: "60fps UI, sub-second loads — iOS and Android from one codebase.",
    metrics: ["‹XXXms› p95 API load", "‹Xs› cold start", "Offline-capable", "‹N› screens shipped"],
    artifacts: [
      { label: "Open the flow", icon: <Zap size={14} /> },
      { label: "Walkthrough", icon: <Play size={14} /> },
      { label: "TestFlight / APK", icon: <ArrowUpRight size={14} /> }
    ]
  }
];

export const founders = [
  {
    name: "Haider Zaman",
    title: "Lead AI Architect",
    focus: "RAG pipelines · autonomous voice agents · LLM systems · Python / FastAPI",
    bio: "‹One honest line — e.g. \"Builds the retrieval and voice systems. N yrs shipping ML in production.\"›",
    initials: "HZ"
  },
  {
    name: "[ Co-Founder ]",
    title: "Mobile & Systems Engineering Lead",
    focus: "React Native · iOS / Android · full-stack web · infrastructure · CI/CD",
    bio: "‹One honest line — e.g. \"Owns mobile + platform. Shipped N apps to the App Store / Play Store.\"›",
    initials: "CF"
  }
];

export const processSteps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discovery Call",
    desc: "We map the problem, constraints, and success metrics — then send a fixed-scope proposal with a timeline and price. No open-ended hourly billing.",
    output: "→ fixed-scope proposal + architecture sketch"
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "Blueprint & Sandbox Demo",
    desc: "Before the full build, we ship a working sandbox — a real, running slice of the system. You validate on something real, not slides.",
    output: "→ architecture diagram + interactive sandbox"
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Production & Handover",
    desc: "We build, test, and deploy to infrastructure you own. You get the repo, docs, and a walkthrough. Optional retainer for iteration.",
    output: "→ production system + repo + docs"
  }
];

export const faqs = [
  { q: "Who owns the code and IP?", a: "You do — 100%. On final payment, all source code, IP, and infrastructure transfer to you. We keep nothing and lock you into nothing. We can sign your NDA before the discovery call." },
  { q: "How do I know you can actually build this?", a: "Run the demos on the Work page — live systems, call recordings, and repos. Then, before any full engagement, we ship a working sandbox so you validate on real output, not a pitch." },
  { q: "What are typical timelines?", a: "RAG knowledge engine: ‹3–6 wks›. Voice agent: ‹4–8 wks›. Mobile app: ‹6–12 wks›. Full-stack web app: ‹4–10 wks›. You get a fixed timeline in the proposal — not \"it depends.\"" },
  { q: "How do you price?", a: "Fixed-scope, milestone-based — not open-ended hourly. You approve scope and price up front. Change requests are quoted separately, so the number never drifts." },
  { q: "What happens to our data?", a: "Your data stays in your infrastructure and accounts wherever possible. We can run fully in your cloud (your OpenAI / Pinecone / AWS keys). Nothing is used to train anything." },
  { q: "Do you do support after launch?", a: "Optional retainer for iteration, monitoring, and support. No lock-in — the repo and docs are yours to hand to any team." },
  { q: "What if we're not a fit?", a: "We'll say so on the first call and point you to someone better. We take on few projects so the ones we take get real senior attention." }
];
