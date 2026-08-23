// Architecture diagram - Cross-platform mobile app.
// RN app (iOS + Android) ↔ typed FastAPI ↔ Postgres, with offline cache + push.
export function MobileDiagram() {
  return (
    <svg viewBox="0 0 340 190" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} role="img" aria-label="Mobile architecture: a React Native app on iOS and Android talks to a typed FastAPI backend and Postgres, with an offline cache and push notifications.">
      <defs>
        <marker id="mob-ah" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#4a4a40" strokeWidth="1.2" />
        </marker>
        <marker id="mob-ah-start" markerWidth="8" markerHeight="8" refX="0.5" refY="3" orient="auto">
          <path d="M6 0 L0 3 L6 6" fill="none" stroke="#4a4a40" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* Push */}
      <rect x="14" y="14" width="86" height="28" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="57" y="32" textAnchor="middle" fill="#b8b8ac" fontSize="10.5" fontFamily="'DM Sans', sans-serif">Push</text>

      {/* RN App (lime) */}
      <rect x="14" y="66" width="86" height="42" rx="7" fill="rgba(200,241,53,0.08)" stroke="#c8f135" />
      <text x="57" y="84" textAnchor="middle" fill="#c8f135" fontSize="11" fontFamily="'DM Sans', sans-serif">RN App</text>
      <text x="57" y="98" textAnchor="middle" fill="#8f9a5e" fontSize="9" fontFamily="'DM Sans', sans-serif">iOS · Android</text>

      {/* Offline cache */}
      <rect x="14" y="132" width="86" height="30" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="57" y="151" textAnchor="middle" fill="#b8b8ac" fontSize="10" fontFamily="'DM Sans', sans-serif">Offline cache</text>

      {/* API */}
      <rect x="128" y="70" width="84" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="170" y="91" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">FastAPI</text>

      {/* Postgres */}
      <rect x="240" y="70" width="86" height="34" rx="7" fill="#131311" stroke="#2a2a24" />
      <text x="283" y="91" textAnchor="middle" fill="#b8b8ac" fontSize="11" fontFamily="'DM Sans', sans-serif">Postgres</text>

      {/* vertical links to app */}
      <line x1="57" y1="42" x2="57" y2="64" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#mob-ah)" />
      <line x1="57" y1="110" x2="57" y2="130" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#mob-ah)" markerStart="url(#mob-ah-start)" />

      {/* horizontal typed links (bidirectional) */}
      <line x1="100" y1="87" x2="126" y2="87" stroke="#c8f135" strokeWidth="1.4" markerEnd="url(#mob-ah)" markerStart="url(#mob-ah-start)" />
      <line x1="212" y1="87" x2="238" y2="87" stroke="#4a4a40" strokeWidth="1.3" markerEnd="url(#mob-ah)" markerStart="url(#mob-ah-start)" />
      <text x="113" y="78" textAnchor="middle" fill="#6b6b60" fontSize="8.5" fontFamily="'DM Sans', sans-serif">typed</text>
    </svg>
  );
}
