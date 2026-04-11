import sharp from 'sharp';

// 1200×630 OG cover image as SVG then → PNG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0a3d55"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="0.3" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="#e8913a"/>

  <!-- Top-right decorative circle -->
  <circle cx="1100" cy="80" r="220" fill="#0d4e6a" opacity="0.6"/>
  <circle cx="1100" cy="80" r="150" fill="#0f5578" opacity="0.5"/>

  <!-- Company name -->
  <text x="80" y="200" font-family="Arial, sans-serif" font-size="28" font-weight="400" fill="#e8913a" letter-spacing="3">ТОВ «КИЇВ-PTS-ЦЕНТР»</text>

  <!-- Main headline UA -->
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">Інженерні рішення</text>
  <text x="80" y="368" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">для бізнесу</text>

  <!-- Sub-line -->
  <text x="80" y="440" font-family="Arial, sans-serif" font-size="24" fill="#a8cdd9">Пневматична пошта · Керування чергою · Депозитарне обладнання</text>

  <!-- Divider -->
  <rect x="80" y="490" width="120" height="3" fill="#e8913a" rx="2"/>

  <!-- Domain -->
  <text x="80" y="545" font-family="Arial, sans-serif" font-size="22" fill="#7ab8cc">pts-centre.kiev.ua</text>

  <!-- Since badge -->
  <rect x="960" y="530" width="180" height="48" rx="24" fill="#e8913a" opacity="0.9"/>
  <text x="1050" y="560" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">З 2005 року</text>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).png().toFile('public/images/og-cover.png');
console.log('✓ public/images/og-cover.png created (1200×630)');
