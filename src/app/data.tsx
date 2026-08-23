import {
  Database, PhoneCall, Smartphone, Code2,
  Zap, Play, GitBranch, ArrowUpRight,
  Search, FlaskConical, Rocket
} from 'lucide-react';
import { RagDiagram } from './components/diagrams/RagDiagram';
import { VoiceDiagram } from './components/diagrams/VoiceDiagram';
import { MobileDiagram } from './components/diagrams/MobileDiagram';
import { SentimentDiagram } from './components/diagrams/SentimentDiagram';

// NOTE: every ‹...› below is a REAL number or asset you must supply before launch.
// If you don't have it yet, cut the claim - do not estimate.

// ─────────────────────────────────────────────────────────────────────
// DEMO / PROOF LINKS - paste your real URLs here. Each matching button on
// the Work page then opens that link instead of the booking form:
//   • https://…  → opens in a new tab (live demo, Loom, repo, TestFlight)
//   • tel:+92…   → dials the demo phone line
//   • ''         → not set yet; button falls back to the "Book a call" form
// ─────────────────────────────────────────────────────────────────────
export const DEMO_LINKS = {
  // Case A - RAG
  ragDemo: '',           // "Try the live demo"
  ragTeardown: '',       // "4-min teardown" (Loom)
  ragArchitecture: '',   // "Architecture" (diagram / repo)
  // Case B - Voice
  voicePlay: '',         // "Play the call" (recording)
  voiceCallLine: '',     // "Call the demo line"  e.g. 'tel:+92XXXXXXXXXX'
  voiceFlow: '',         // "Call-flow" (diagram)
  // Case C - Mobile
  mobileFlow: '',        // "Open the flow" (prototype / Expo web)
  mobileWalkthrough: '', // "Walkthrough" (Loom)
  mobileTestflight: '',  // "TestFlight / APK"
};

export const services = [
  {
    title: "Enterprise RAG & Knowledge Engines",
    oneLiner: "Retrieval systems that answer from your data - with citations, not hallucinations.",
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
    oneLiner: "Voice agents that answer, qualify, book, and route - 24/7, in natural speech.",
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
    overview: "Production mobile apps in React Native / Expo - offline-first, push-enabled, wired to a typed API. We own the full lifecycle: architecture, build pipeline (EAS), and App Store / Play Store submission.",
    deliverables: [
      "React Native (Expo) app - iOS + Android from one codebase",
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
    oneLiner: "Typed, tested, observable web apps - from database schema to production deploy.",
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
      "Repo + infra handover - you own everything"
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
    headline: "Ask it anything about Proximux. It answers from our own content, live.",
    metrics: [
      "Grounded in Proximux's real content, not a canned script",
      "Full-text retrieval over our own docs",
      "The same RAG approach we build for clients",
      "Running now, open the chat at the bottom right"
    ],
    artifacts: [
      { label: "Try the live demo", icon: <Zap size={14} />, action: "chat" as const }
    ]
  },
  {
    mediaType: "demo" as const,
    mediaLabel: "Fine-tuned model demo",
    diagram: <SentimentDiagram />,
    headline: "A BERT model we fine-tuned with LoRA, classifying sentiment live in your browser.",
    metrics: [
      "We fine-tuned the model ourselves, not a third-party API call",
      "LoRA parameter-efficient fine-tuning on real review data",
      "Served over FastAPI with a live confidence score",
      "Single review, batch, and CSV upload, running now"
    ],
    artifacts: [
      { label: "Try the live demo", icon: <Zap size={14} />, href: "https://movie-review-analysi5.streamlit.app/" },
      { label: "GitHub", icon: <GitBranch size={14} />, href: "https://github.com/haiderzaman1782/movie-review-fine-tuned-model" }
    ]
  },
  {
    // Coming soon: set comingSoon to false and fill DEMO_LINKS.voice* once the demo line is live.
    comingSoon: true,
    mediaType: "audio" as const,
    mediaLabel: "Voice agent demo",
    diagram: <VoiceDiagram />,
    headline: "A voice agent that answers, qualifies, and books over a real phone call.",
    metrics: [
      "Natural turn-taking with barge-in, not a phone menu",
      "Books appointments and writes to your CRM live",
      "Hands off to a human with full call context",
      "Runs 24/7 on your own number"
    ],
    artifacts: [
      { label: "Play the call", icon: <Play size={14} />, href: DEMO_LINKS.voicePlay },
      { label: "Call the demo line", icon: <PhoneCall size={14} />, href: DEMO_LINKS.voiceCallLine },
      { label: "Call-flow", icon: <GitBranch size={14} />, href: DEMO_LINKS.voiceFlow }
    ]
  },
  {
    // Coming soon: set comingSoon to false and fill DEMO_LINKS.mobile* once the walkthrough is ready.
    comingSoon: true,
    mediaType: "video" as const,
    mediaLabel: "Mobile app demo",
    diagram: <MobileDiagram />,
    headline: "One React Native codebase, shipped to the App Store and Play Store.",
    metrics: [
      "iOS and Android from a single codebase",
      "Offline-first with background sync",
      "Push, auth, and in-app payments built in",
      "Typed end to end with the backend"
    ],
    artifacts: [
      { label: "Open the flow", icon: <Zap size={14} />, href: DEMO_LINKS.mobileFlow },
      { label: "Walkthrough", icon: <Play size={14} />, href: DEMO_LINKS.mobileWalkthrough },
      { label: "TestFlight / APK", icon: <ArrowUpRight size={14} />, href: DEMO_LINKS.mobileTestflight }
    ]
  }
];

export const founders = [
  {
    name: "Haider Zaman",
    title: "Lead AI Architect",
    focus: "RAG pipelines · autonomous voice agents · LLM systems · Python / FastAPI",
    bio: "‹One honest line - e.g. \"Builds the retrieval and voice systems. N yrs shipping ML in production.\"›",
    initials: "HZ"
  },
  {
    name: "[ Co-Founder ]",
    title: "Mobile & Systems Engineering Lead",
    focus: "React Native · iOS / Android · full-stack web · infrastructure · CI/CD",
    bio: "‹One honest line - e.g. \"Owns mobile + platform. Shipped N apps to the App Store / Play Store.\"›",
    initials: "CF"
  }
];

export const processSteps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discovery Call",
    desc: "We map the problem, constraints, and success metrics - then send a fixed-scope proposal with a timeline and price. No open-ended hourly billing.",
    output: "→ fixed-scope proposal + architecture sketch"
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "Blueprint & Sandbox Demo",
    desc: "Before the full build, we ship a working sandbox - a real, running slice of the system. You validate on something real, not slides.",
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
  { q: "Who owns the code and IP?", a: "You do - 100%. On final payment, all source code, IP, and infrastructure transfer to you. We keep nothing and lock you into nothing. We can sign your NDA before the discovery call." },
  { q: "How do I know you can actually build this?", a: "Run the demos on the Work page - live systems, call recordings, and repos. Then, before any full engagement, we ship a working sandbox so you validate on real output, not a pitch." },
  { q: "What are typical timelines?", a: "RAG knowledge engine: ‹3–6 wks›. Voice agent: ‹4–8 wks›. Mobile app: ‹6–12 wks›. Full-stack web app: ‹4–10 wks›. You get a fixed timeline in the proposal - not \"it depends.\"" },
  { q: "How do you price?", a: "Fixed-scope, milestone-based - not open-ended hourly. You approve scope and price up front. Change requests are quoted separately, so the number never drifts." },
  { q: "What happens to our data?", a: "Your data stays in your infrastructure and accounts wherever possible. We can run fully in your cloud (your OpenAI / Pinecone / AWS keys). Nothing is used to train anything." },
  { q: "Do you do support after launch?", a: "Optional retainer for iteration, monitoring, and support. No lock-in - the repo and docs are yours to hand to any team." },
  { q: "What if we're not a fit?", a: "We'll say so on the first call and point you to someone better. We take on few projects so the ones we take get real senior attention." }
];

// ── Projects: the founder's real portfolio (from resume). Honest capability proof. ──
export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  featured?: boolean;   // shown in the Home preview (top 3)
  link?: string;        // optional live/repo/store URL
  linkLabel?: string;
  demo?: string;        // optional live demo URL (shows a "Live demo" button)
};

export const projects: Project[] = [
  {
    title: "AI-Powered Ordering Platform",
    category: "AI · Full-Stack",
    description: "A production ordering system with a contextual AI chat assistant, round-robin rider assignment for deliveries, real-time notifications, Google OAuth, and full admin controls.",
    tags: ["Python", "FastAPI", "AI Chat", "Real-time", "OAuth"],
    featured: true
  },
  {
    title: "IOS - AI Emoji & Sticker App",
    category: "iOS · AI",
    description: "A shipped iOS app that generates personalized emojis, stickers, and short videos through a job-based async pipeline over third-party image and video AI APIs, gated by a StoreKit 2 credit wallet.",
    tags: ["Swift", "TCA", "Firebase", "StoreKit 2", "AI APIs"],
    featured: true
  },
  {
    title: "Multi-Tenant E-Commerce Platform",
    category: "Web · SaaS",
    description: "A Shopify-inspired platform letting multiple vendors run independent branded storefronts from a single codebase, with dynamic subdomain routing and the Shopify Storefront GraphQL API.",
    tags: ["Next.js", "React Server Components", "GraphQL", "SaaS"],
    featured: true
  },
  {
    title: "Cross-Platform Email Sequencer",
    category: "Cross-Platform",
    description: "An email sequencing and automation tool sharing one set of responsive, reusable UI components across mobile and web, with OAuth 2.0 sign-in.",
    tags: ["React Native", "React", "OAuth 2.0"]
  },
  {
    title: "Book Recommendation System",
    category: "Machine Learning",
    description: "A personalized recommendation engine using collaborative and content-based filtering to tailor suggestions from a user's reading history and preferences.",
    tags: ["Python", "Pandas", "Recommender"]
  },
  {
    title: "Booking Dashboard",
    category: "Frontend",
    description: "A responsive dashboard to manage bookings, monitor user activity, and surface insights through charts and data tables.",
    tags: ["React", "Tailwind", "Data Viz"]
  },
  {
    title: "Fine-Tuned Sentiment Analyzer (BERT + LoRA)",
    category: "AI · ML / NLP",
    description: "A full-stack sentiment analyzer that fine-tunes BERT with LoRA (parameter-efficient fine-tuning) to classify movie reviews as positive, negative, or neutral, served via a FastAPI API with a Streamlit dashboard for batch analysis and visualizations.",
    tags: ["PyTorch", "Hugging Face", "LoRA / PEFT", "FastAPI", "Streamlit"],
    link: "https://github.com/haiderzaman1782/movie-review-fine-tuned-model",
    linkLabel: "GitHub",
    demo: "https://movie-review-analysi5.streamlit.app/"
  }
];
