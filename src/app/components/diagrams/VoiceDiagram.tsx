// Architecture diagram — Autonomous AI Voice / Receptionist loop.
// Caller → STT → LLM (+ tools) → TTS → back to caller; LLM writes to CRM/Calendar.
export function VoiceDiagram() {
  return (
    <svg viewBox="0 0 340 190" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} role="img" aria-label="Voice agent loop: a caller's speech is transcribed, processed by an LLM with tools, spoken back via TTS, while the LLM syncs to CRM and calendar.">
      <defs>
        <marker id="voice-ah" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#4a4a40" strokeWidth="1.2" />
        </marker>
        <marker id="voice-ah-lime" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#c8f135" strokeWidth="1.2" />
        </marker>
      </defs>

      <rect x="8" y="30" width="62" height="34" rx="7" fill="rgba(200,241,53,0.08)" stroke="#c8f135" />
      <text x="39" y="51" textAnchor="middle" fill="#c8f135" fontSize="11" fontFamily="'DM Sans', sans-serif">Caller</text>

      <rect x="90" y="30" width="62" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="121" y="51" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">STT</text>

      <rect x="172" y="30" width="72" height="34" rx="7" fill="rgba(200,241,53,0.08)" stroke="#c8f135" />
      <text x="208" y="45" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">LLM +</text>
      <text x="208" y="57" textAnchor="middle" fill="#c8f135" fontSize="10.5" fontFamily="'DM Sans', sans-serif">tools</text>

      <rect x="264" y="30" width="62" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="295" y="51" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">TTS</text>

      {/* forward chain */}
      <line x1="70" y1="47" x2="86" y2="47" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#voice-ah)" />
      <line x1="152" y1="47" x2="168" y2="47" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#voice-ah)" />
      <line x1="244" y1="47" x2="260" y2="47" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#voice-ah)" />

      {/* return loop TTS -> Caller */}
      <path d="M295 64 C 295 118, 39 118, 39 66" fill="none" stroke="#c8f135" strokeWidth="1.4" markerEnd="url(#voice-ah-lime)" />
      <text x="167" y="112" textAnchor="middle" fill="#6b6b60" fontSize="9.5" fontFamily="'DM Sans', sans-serif">voice reply</text>

      {/* CRM tap */}
      <rect x="172" y="140" width="72" height="32" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="208" y="160" textAnchor="middle" fill="#b8b8ac" fontSize="10.5" fontFamily="'DM Sans', sans-serif">CRM / Cal</text>
      <line x1="208" y1="64" x2="208" y2="138" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#voice-ah)" />
    </svg>
  );
}
