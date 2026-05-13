export function SalonChairIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="salon-title salon-desc"
    >
      <title id="salon-title">Menina no salão de beleza</title>
      <desc id="salon-desc">Ilustração minimalista de uma menina sentada em uma poltrona de salão, com uma tesoura próxima ao cabelo, simulando um corte de cabelo delicado.</desc>

      {/* Background soft circle */}
      <circle cx="240" cy="180" r="160" fill="#fdf2f8" />

      {/* Salon chair - base */}
      <rect x="170" y="290" width="140" height="8" rx="4" fill="#f9a8d4" />
      <rect x="225" y="260" width="30" height="35" rx="4" fill="#f9a8d4" />
      <ellipse cx="240" cy="298" rx="35" ry="6" fill="#f472b6" opacity="0.3" />

      {/* Chair back */}
      <path
        d="M175 150c0-15 10-25 25-28h80c15 3 25 13 25 28v100c0 8-5 14-12 15H187c-7-1-12-7-12-15z"
        fill="#fff"
        stroke="#db2777"
        strokeWidth="2"
      />
      {/* Chair cushion detail */}
      <path
        d="M185 245c0-5 4-9 10-9h90c6 0 10 4 10 9v10c0 4-4 7-10 7H195c-6 0-10-3-10-7z"
        fill="#fff"
        stroke="#db2777"
        strokeWidth="2"
      />
      {/* Chair arm rest */}
      <path d="M170 190h-10c-5 0-8 3-8 7v20c0 4 3 7 8 7h10" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />
      <path d="M310 190h10c5 0 8 3 8 7v20c0 4-3 7-8 7h-10" stroke="#db2777" strokeWidth="2" strokeLinecap="round" fill="#fff" />

      {/* Girl - body (sitting, slight profile facing left) */}
      <path
        d="M210 200c-5 10-8 25-8 45h76c0-20-3-35-8-45-5-8-15-12-30-12s-25 4-30 12z"
        fill="#fff"
        stroke="#db2777"
        strokeWidth="2"
      />

      {/* Neck */}
      <rect x="228" y="155" width="18" height="20" rx="9" fill="#fff" stroke="#db2777" strokeWidth="1.5" />

      {/* Head (slight 3/4 view facing left) */}
      <ellipse cx="237" cy="125" rx="35" ry="38" fill="#fff" stroke="#db2777" strokeWidth="2" />

      {/* Hair - long flowing */}
      <path
        d="M205 100c-3-20 10-38 32-40 22-2 38 12 38 35 0 10-3 18-5 22"
        fill="none"
        stroke="#db2777"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Hair flowing down - back */}
      <path
        d="M270 117c5 15 8 40 5 70 -2 20-5 35-10 45"
        stroke="#db2777"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hair flowing down - front */}
      <path
        d="M207 108c-5 15-8 35-5 55 2 15 5 25 8 30"
        stroke="#db2777"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hair strand details */}
      <path d="M215 95c-8 20-10 50-5 75" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M260 95c8 20 10 50 5 75" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M237 62c0 10-2 20-5 30" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Face details - minimal */}
      {/* Eye (closed, relaxed) */}
      <path d="M222 122c3-3 8-3 11 0" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" />
      {/* Eyelashes */}
      <path d="M220 120l-2-2" stroke="#db2777" strokeWidth="1" strokeLinecap="round" />
      <path d="M235 120l2-2" stroke="#db2777" strokeWidth="1" strokeLinecap="round" />
      {/* Smile */}
      <path d="M224 138c4 3 10 3 14 0" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="217" cy="133" r="4" fill="#f9a8d4" opacity="0.4" />
      <circle cx="245" cy="133" r="4" fill="#f9a8d4" opacity="0.4" />

      {/* Scissors - open, near hair */}
      <g transform="translate(295, 95) rotate(25)">
        {/* Blade 1 */}
        <path
          d="M0 0L-25-8c-2-1-3 0-3 2l3 10"
          stroke="#db2777"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Blade 2 */}
        <path
          d="M0 0L-25 12c-2 1-3 0-2-2l2-10"
          stroke="#db2777"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Pivot */}
        <circle cx="0" cy="0" r="3" fill="#db2777" />
        {/* Handle rings */}
        <ellipse cx="10" cy="-8" rx="7" ry="8" stroke="#db2777" strokeWidth="2" fill="none" />
        <ellipse cx="10" cy="10" rx="7" ry="8" stroke="#db2777" strokeWidth="2" fill="none" />
      </g>

      {/* Small cut hair pieces falling */}
      <path d="M280 150c2 5 1 10-1 12" stroke="#db2777" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M285 160c1 4 0 8-2 10" stroke="#db2777" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M275 155c1 3 2 7 0 9" stroke="#db2777" strokeWidth="1" strokeLinecap="round" opacity="0.35" />

      {/* Sparkles around */}
      <path d="M350 70l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#db2777" opacity="0.4" />
      <path d="M100 90l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z" fill="#db2777" opacity="0.3" />
      <circle cx="120" cy="260" r="3" fill="#f9a8d4" opacity="0.5" />
      <circle cx="360" cy="230" r="2.5" fill="#f9a8d4" opacity="0.4" />

      {/* Small heart */}
      <path d="M370 140c-2-3-6-3-6 0 0 4 6 6 6 6s6-2 6-6c0-3-4-3-6 0z" fill="#db2777" opacity="0.3" />
    </svg>
  )
}
