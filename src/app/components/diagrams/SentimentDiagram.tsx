// Architecture diagram - fine-tuned sentiment analyzer (BERT + LoRA) pipeline.
// Schematic, dark + lime, scales to its container. Matches RagDiagram conventions.
export function SentimentDiagram() {
  return (
    <svg viewBox="0 0 340 190" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} role="img" aria-label="Sentiment pipeline: a review is tokenized, classified by a BERT model fine-tuned with LoRA, served over FastAPI, and returned as a sentiment label with a confidence score.">
      <defs>
        <marker id="sent-ah" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#4a4a40" strokeWidth="1.2" />
        </marker>
        <marker id="sent-ah-lime" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#c8f135" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* top row */}
      <rect x="10" y="24" width="86" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="53" y="45" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">Review</text>

      <rect x="127" y="24" width="86" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="170" y="45" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">Tokenize</text>

      <rect x="244" y="24" width="86" height="34" rx="7" fill="rgba(200,241,53,0.08)" stroke="#c8f135" />
      <text x="287" y="40" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">BERT +</text>
      <text x="287" y="52" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">LoRA</text>

      <line x1="98" y1="41" x2="123" y2="41" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#sent-ah)" />
      <line x1="215" y1="41" x2="240" y2="41" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#sent-ah)" />
      <line x1="287" y1="58" x2="287" y2="128" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#sent-ah)" />

      {/* bottom row */}
      <rect x="244" y="132" width="86" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="287" y="153" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">FastAPI</text>

      <rect x="127" y="132" width="86" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="170" y="153" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">Softmax</text>

      <rect x="10" y="132" width="86" height="34" rx="7" fill="rgba(200,241,53,0.08)" stroke="#c8f135" />
      <text x="53" y="148" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">Sentiment</text>
      <text x="53" y="160" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">+ score</text>

      <line x1="244" y1="149" x2="215" y2="149" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#sent-ah)" />
      <line x1="127" y1="149" x2="98" y2="149" stroke="#c8f135" strokeWidth="1.4" markerEnd="url(#sent-ah-lime)" />
    </svg>
  );
}
