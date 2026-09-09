// Architecture diagram - Enterprise RAG & Knowledge Engine pipeline.
// Schematic; theme-aware via --dgm-* tokens; scales to its container.
export function RagDiagram() {
  return (
    <svg viewBox="0 0 340 190" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} role="img" aria-label="RAG pipeline: documents are chunked and embedded into a vector database, then retrieved, reranked, and answered by an LLM with citations.">
      <defs>
        <marker id="rag-ah" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--dgm-muted)" strokeWidth="1.2" />
        </marker>
        <marker id="rag-ah-lime" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--dgm-accent)" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* top row */}
      <rect x="10" y="24" width="86" height="34" rx="7" fill="var(--dgm-box)" stroke="var(--dgm-box-border)" />
      <text x="53" y="45" textAnchor="middle" fill="var(--dgm-text)" fontSize="11" fontFamily="'Inter', sans-serif">Docs</text>

      <rect x="127" y="24" width="86" height="34" rx="7" fill="var(--dgm-box)" stroke="var(--dgm-box-border)" />
      <text x="170" y="40" textAnchor="middle" fill="var(--dgm-text)" fontSize="10.5" fontFamily="'Inter', sans-serif">Chunk +</text>
      <text x="170" y="52" textAnchor="middle" fill="var(--dgm-text)" fontSize="10.5" fontFamily="'Inter', sans-serif">Embed</text>

      <rect x="244" y="24" width="86" height="34" rx="7" fill="var(--dgm-accent-bg)" stroke="var(--dgm-accent)" />
      <text x="287" y="45" textAnchor="middle" fill="var(--dgm-accent)" fontSize="11" fontFamily="'Inter', sans-serif">Vector DB</text>

      <line x1="98" y1="41" x2="123" y2="41" stroke="var(--dgm-muted)" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="215" y1="41" x2="240" y2="41" stroke="var(--dgm-muted)" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="287" y1="58" x2="287" y2="128" stroke="var(--dgm-muted)" strokeWidth="1.3" markerEnd="url(#rag-ah)" />

      {/* bottom row */}
      <rect x="244" y="132" width="86" height="34" rx="7" fill="var(--dgm-box)" stroke="var(--dgm-box-border)" />
      <text x="287" y="153" textAnchor="middle" fill="var(--dgm-text)" fontSize="11" fontFamily="'Inter', sans-serif">Rerank</text>

      <rect x="127" y="132" width="86" height="34" rx="7" fill="var(--dgm-accent-bg)" stroke="var(--dgm-accent)" />
      <text x="170" y="153" textAnchor="middle" fill="var(--dgm-accent)" fontSize="11" fontFamily="'Inter', sans-serif">LLM</text>

      <rect x="10" y="132" width="86" height="34" rx="7" fill="var(--dgm-box)" stroke="var(--dgm-box-border)" />
      <text x="53" y="148" textAnchor="middle" fill="var(--dgm-text)" fontSize="10.5" fontFamily="'Inter', sans-serif">Cited</text>
      <text x="53" y="160" textAnchor="middle" fill="var(--dgm-text)" fontSize="10.5" fontFamily="'Inter', sans-serif">answer</text>

      <line x1="244" y1="149" x2="215" y2="149" stroke="var(--dgm-muted)" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="127" y1="149" x2="98" y2="149" stroke="var(--dgm-accent)" strokeWidth="1.4" markerEnd="url(#rag-ah-lime)" />
    </svg>
  );
}
