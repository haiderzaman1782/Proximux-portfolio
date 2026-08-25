// Wireframe globe used behind the hero headline (matches the reference design).
// Pure SVG, scales to its container, purely decorative.
export function HeroGlobe() {
  const line = "rgba(79,114,86,0.24)";
  const faint = "rgba(79,114,86,0.14)";
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: 'block' }}>
      <g fill="none" strokeWidth="1">
        {/* sphere outline */}
        <circle cx="300" cy="300" r="290" stroke={line} />

        {/* meridians (longitude) - vertical ellipses */}
        <ellipse cx="300" cy="300" rx="222" ry="290" stroke={faint} />
        <ellipse cx="300" cy="300" rx="140" ry="290" stroke={faint} />
        <ellipse cx="300" cy="300" rx="58" ry="290" stroke={faint} />
        <line x1="300" y1="10" x2="300" y2="590" stroke={faint} />

        {/* parallels (latitude) - tilted horizontal ellipses */}
        <ellipse cx="300" cy="300" rx="290" ry="46" stroke={line} />
        <ellipse cx="300" cy="160" rx="253" ry="36" stroke={faint} />
        <ellipse cx="300" cy="440" rx="253" ry="36" stroke={faint} />
        <ellipse cx="300" cy="58" rx="150" ry="22" stroke={faint} />
        <ellipse cx="300" cy="542" rx="150" ry="22" stroke={faint} />
      </g>
    </svg>
  );
}
