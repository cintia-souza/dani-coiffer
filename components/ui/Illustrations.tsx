export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="200" cy="160" r="145" fill="#fdf2f8" />
      <circle cx="200" cy="160" r="115" fill="#fce7f3" opacity="0.4" />

      {/* Long flowing hair - back layer */}
      <path d="M150 100c-15 30-20 80-5 130 5 15 15 25 30 30" fill="#be185d" opacity="0.3" />
      <path d="M250 100c15 30 20 80 5 130-5 15-15 25-30 30" fill="#be185d" opacity="0.3" />

      {/* Head */}
      <ellipse cx="200" cy="115" rx="40" ry="45" fill="#fef3c7" />

      {/* Hair - top and sides */}
      <path d="M160 105c0-40 18-55 40-55s40 15 40 55c0 5-2 10-5 12h-70c-3-2-5-7-5-12z" fill="#4a2c2a" />
      <path d="M155 110c-3 25-2 55 5 85 3 10 8 18 15 22" fill="#4a2c2a" opacity="0.9" />
      <path d="M245 110c3 25 2 55-5 85-3 10-8 18-15 22" fill="#4a2c2a" opacity="0.9" />
      {/* Hair highlights */}
      <path d="M170 70c5-5 15-8 25-8" stroke="#6b3a3a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M160 100c-2 20 0 45 5 65" stroke="#6b3a3a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Face */}
      <ellipse cx="186" cy="118" rx="4" ry="5" fill="#4a2c2a" />
      <ellipse cx="214" cy="118" rx="4" ry="5" fill="#4a2c2a" />
      <path d="M190 135c5 5 15 5 20 0" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="200" cy="125" rx="3" ry="2" fill="#f9a8d4" opacity="0.5" />

      {/* Neck and shoulders */}
      <path d="M190 155v15c-10 5-25 10-35 15" stroke="#fbbf24" strokeWidth="0" fill="#fef3c7" />
      <path d="M210 155v15c10 5 25 10 35 15" stroke="#fbbf24" strokeWidth="0" fill="#fef3c7" />
      <rect x="188" y="155" width="24" height="18" rx="5" fill="#fef3c7" />

      {/* Dress top */}
      <path d="M165 185c-10 8-18 30-18 50h106c0-20-8-42-18-50-8-5-20-8-35-8s-27 3-35 8z" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
      <path d="M185 177c5-2 10-3 15-3s10 1 15 3" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Scissors */}
      <g transform="translate(305, 85) rotate(15)">
        <ellipse cx="-7" cy="10" rx="8" ry="9" fill="none" stroke="#db2777" strokeWidth="2" />
        <ellipse cx="7" cy="10" rx="8" ry="9" fill="none" stroke="#db2777" strokeWidth="2" />
        <path d="M-2 4L10-15" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M2 4L-10-15" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="2" r="3" fill="#db2777" />
      </g>

      {/* Hair dryer */}
      <g transform="translate(60, 130)">
        <ellipse cx="25" cy="15" rx="20" ry="14" fill="#fff" stroke="#ec4899" strokeWidth="2" />
        <rect x="0" y="9" width="12" height="12" rx="4" fill="#fff" stroke="#ec4899" strokeWidth="2" />
        <path d="M45 10c4-2 8-1 10 1M45 15c5 0 9 1 11 2M45 20c4 2 8 1 10-1" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Decorative elements */}
      <circle cx="330" cy="200" r="4" fill="#f9a8d4" />
      <circle cx="70" cy="220" r="3" fill="#fbcfe8" />
      <path d="M345 55l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ec4899" opacity="0.5" />
      <path d="M55 60l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f472b6" opacity="0.4" />
      <circle cx="310" cy="260" r="3" fill="#f472b6" opacity="0.4" />

      {/* Small hearts */}
      <path d="M85 270c-2-3-7-3-7 0 0 4 7 7 7 7s7-3 7-7c0-3-5-3-7 0z" fill="#ec4899" opacity="0.35" />
      <path d="M325 240c-1.5-2.5-5-2.5-5 0 0 3 5 5.5 5 5.5s5-2.5 5-5.5c0-2.5-3.5-2.5-5 0z" fill="#f9a8d4" opacity="0.4" />
    </svg>
  )
}

export function NailArtIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#fdf2f8" />

      {/* Hand outline */}
      <path d="M75 155v-30c0-4 3-7 7-7s7 3 7 7v20" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />
      <path d="M89 135v-35c0-4 3-7 7-7s7 3 7 7v35" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />
      <path d="M103 135v-40c0-4 3-7 7-7s7 3 7 7v40" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />
      <path d="M117 135v-32c0-4 3-7 7-7s7 3 7 7v32" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />

      {/* Palm */}
      <path d="M75 155c0 12 10 20 25 20h10c15 0 25-8 25-20v-20H75z" fill="#fff" stroke="#db2777" strokeWidth="2" />

      {/* Painted nails */}
      <rect x="78" y="118" width="8" height="12" rx="4" fill="#ec4899" />
      <rect x="92" y="95" width="8" height="12" rx="4" fill="#db2777" />
      <rect x="106" y="88" width="8" height="12" rx="4" fill="#ec4899" />
      <rect x="120" y="96" width="8" height="12" rx="4" fill="#db2777" />

      {/* Nail polish bottle */}
      <rect x="40" y="55" width="18" height="35" rx="6" fill="#ec4899" />
      <rect x="45" y="45" width="8" height="14" rx="2" fill="#db2777" />
      <rect x="47" y="40" width="4" height="8" rx="2" fill="#be185d" />

      {/* Sparkles */}
      <path d="M155 50l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#f472b6" opacity="0.6" />
      <circle cx="160" cy="140" r="3" fill="#f9a8d4" />
      <circle cx="35" cy="100" r="2.5" fill="#fbcfe8" />
    </svg>
  )
}

export function SpaIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#fdf2f8" />

      {/* Hair dryer */}
      <ellipse cx="115" cy="95" rx="30" ry="25" fill="#fff" stroke="#db2777" strokeWidth="2" />
      <rect x="70" y="85" width="25" height="20" rx="5" fill="#fff" stroke="#db2777" strokeWidth="2" />
      <rect x="55" y="88" width="18" height="14" rx="4" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />

      {/* Air flow lines */}
      <path d="M145 85c8-3 15-2 20 0" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M148 95c10 0 18 0 22 2" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M145 105c8 3 15 2 20 0" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" />

      {/* Hair strands being styled */}
      <path d="M100 130c-5 10-15 25-20 40" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M110 130c0 12-5 28-8 42" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M120 130c5 10 10 25 5 40" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Sparkles */}
      <path d="M50 55l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#ec4899" opacity="0.5" />
      <circle cx="160" cy="55" r="3" fill="#f9a8d4" />
      <circle cx="45" cy="150" r="2.5" fill="#fbcfe8" />
      <path d="M155 155l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#f472b6" opacity="0.4" />
    </svg>
  )
}

export function MirrorIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#fdf2f8" />

      {/* Mirror */}
      <ellipse cx="100" cy="85" rx="38" ry="48" fill="#fff" stroke="#db2777" strokeWidth="2.5" />
      <ellipse cx="100" cy="85" rx="32" ry="42" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="1" />

      {/* Handle */}
      <rect x="94" y="133" width="12" height="35" rx="6" fill="#db2777" />
      <ellipse cx="100" cy="170" rx="10" ry="5" fill="#be185d" />

      {/* Reflection shine */}
      <path d="M80 65c3-8 10-12 15-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Lipstick */}
      <g transform="translate(148, 60)">
        <rect x="0" y="10" width="10" height="25" rx="3" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <path d="M0 10h10L8 0H2z" fill="#ec4899" />
      </g>

      {/* Sparkles */}
      <path d="M45 70l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f472b6" opacity="0.5" />
      <circle cx="155" cy="130" r="3" fill="#f9a8d4" />
      <circle cx="50" cy="140" r="2" fill="#fbcfe8" />
    </svg>
  )
}

export function HeartFlowerIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#fdf2f8" />

      {/* Heart */}
      <path d="M100 145c-35-25-55-45-55-65 0-20 15-35 32-35 12 0 20 7 23 14 3-7 11-14 23-14 17 0 32 15 32 35 0 20-20 40-55 65z" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />

      {/* Flower in center */}
      <circle cx="100" cy="100" r="10" fill="#ec4899" opacity="0.3" />
      <circle cx="100" cy="100" r="5" fill="#db2777" />
      <ellipse cx="100" cy="85" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" />
      <ellipse cx="100" cy="115" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" />
      <ellipse cx="86" cy="96" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" transform="rotate(-60 86 96)" />
      <ellipse cx="114" cy="96" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" transform="rotate(60 114 96)" />
      <ellipse cx="86" cy="104" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" transform="rotate(60 86 104)" />
      <ellipse cx="114" cy="104" rx="5" ry="10" fill="#f9a8d4" opacity="0.6" transform="rotate(-60 114 104)" />

      {/* Sparkles */}
      <path d="M50 50l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#ec4899" opacity="0.5" />
      <path d="M155 55l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#f472b6" opacity="0.4" />
      <circle cx="45" cy="150" r="3" fill="#f9a8d4" />
      <circle cx="160" cy="145" r="2.5" fill="#fbcfe8" />
    </svg>
  )
}

export function BrushIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#fdf2f8" />

      {/* Makeup brush handle */}
      <rect x="85" y="100" width="10" height="70" rx="5" fill="#db2777" opacity="0.8" />
      <rect x="83" y="95" width="14" height="10" rx="3" fill="#be185d" />

      {/* Brush head */}
      <ellipse cx="90" cy="75" rx="18" ry="25" fill="#f9a8d4" />
      <ellipse cx="90" cy="70" rx="14" ry="20" fill="#f472b6" opacity="0.5" />
      <ellipse cx="90" cy="65" rx="10" ry="15" fill="#ec4899" opacity="0.3" />

      {/* Powder puff */}
      <circle cx="140" cy="120" r="20" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
      <circle cx="140" cy="120" r="12" fill="#fff" opacity="0.5" />

      {/* Powder particles */}
      <circle cx="125" cy="55" r="3" fill="#f9a8d4" opacity="0.5" />
      <circle cx="115" cy="45" r="2" fill="#ec4899" opacity="0.4" />
      <circle cx="105" cy="50" r="2.5" fill="#f472b6" opacity="0.3" />
      <circle cx="70" cy="55" r="2" fill="#fbcfe8" opacity="0.6" />
      <circle cx="60" cy="70" r="1.5" fill="#f9a8d4" opacity="0.4" />

      {/* Sparkles */}
      <path d="M155 55l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ec4899" opacity="0.5" />
      <path d="M45 130l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#f472b6" opacity="0.4" />
    </svg>
  )
}
