// Architecture diagram - Enterprise RAG & Knowledge Engine pipeline.
// Schematic, dark + lime, scales to its container.
export function RagDiagram() {
  return (
    <svg viewBox="0 0 340 190" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} role="img" aria-label="RAG pipeline: documents are chunked and embedded into a vector database, then retrieved, reranked, and answered by an LLM with citations.">
      <defs>
        <marker id="rag-ah" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#5f7a83" strokeWidth="1.2" />
        </marker>
        <marker id="rag-ah-lime" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#2b6ea3" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* top row */}
      <rect x="10" y="24" width="86" height="34" rx="7" fill="#e3f0f3" stroke="#d3e5ea" />
      <text x="53" y="45" textAnchor="middle" fill="#10222a" fontSize="11" fontFamily="'DM Sans', sans-serif">Docs</text>

      <rect x="127" y="24" width="86" height="34" rx="7" fill="#e3f0f3" stroke="#d3e5ea" />
      <text x="170" y="40" textAnchor="middle" fill="#10222a" fontSize="10.5" fontFamily="'DM Sans', sans-serif">Chunk +</text>
      <text x="170" y="52" textAnchor="middle" fill="#10222a" fontSize="10.5" fontFamily="'DM Sans', sans-serif">Embed</text>

      <rect x="244" y="24" width="86" height="34" rx="7" fill="rgba(43,110,163,0.08)" stroke="#2b6ea3" />
      <text x="287" y="45" textAnchor="middle" fill="#2b6ea3" fontSize="11" fontFamily="'DM Sans', sans-serif">Vector DB</text>

      <line x1="98" y1="41" x2="123" y2="41" stroke="#5f7a83" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="215" y1="41" x2="240" y2="41" stroke="#5f7a83" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="287" y1="58" x2="287" y2="128" stroke="#5f7a83" strokeWidth="1.3" markerEnd="url(#rag-ah)" />

      {/* bottom row */}
      <rect x="244" y="132" width="86" height="34" rx="7" fill="#e3f0f3" stroke="#d3e5ea" />
      <text x="287" y="153" textAnchor="middle" fill="#10222a" fontSize="11" fontFamily="'DM Sans', sans-serif">Rerank</text>

      <rect x="127" y="132" width="86" height="34" rx="7" fill="rgba(43,110,163,0.08)" stroke="#2b6ea3" />
      <text x="170" y="153" textAnchor="middle" fill="#2b6ea3" fontSize="11" fontFamily="'DM Sans', sans-serif">LLM</text>

      <rect x="10" y="132" width="86" height="34" rx="7" fill="#e3f0f3" stroke="#d3e5ea" />
      <text x="53" y="148" textAnchor="middle" fill="#10222a" fontSize="10.5" fontFamily="'DM Sans', sans-serif">Cited</text>
      <text x="53" y="160" textAnchor="middle" fill="#10222a" fontSize="10.5" fontFamily="'DM Sans', sans-serif">answer</text>

      <line x1="244" y1="149" x2="215" y2="149" stroke="#5f7a83" strokeWidth="1.3" markerEnd="url(#rag-ah)" />
      <line x1="127" y1="149" x2="98" y2="149" stroke="#2b6ea3" strokeWidth="1.4" markerEnd="url(#rag-ah-lime)" />
    </svg>
  );
}
