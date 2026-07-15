import { motion, useTransform, type MotionValue } from 'framer-motion'

interface BannerProps {
  /** 0→1 scroll-beat progress (constant 1 under reduced motion) */
  progress: MotionValue<number>
}

/**
 * Helios Protocol banner — hybrid motion graphics.
 * Idle: CRT cursor blink, subtle title glitch jitter, scanline texture.
 * Scroll beats: a branching storyline path draws toward three endings,
 * choice nodes light up, and the 1st-place badge pops at the end.
 */
export default function HeliosBanner({ progress }: BannerProps) {
  // title slides in first
  const titleO = useTransform(progress, [0.0, 0.22], [0, 1], { clamp: true })
  const titleY = useTransform(progress, [0.0, 0.22], [40, 0], { clamp: true })

  // branching paths draw in staggered windows
  const p1 = useTransform(progress, [0.2, 0.55], [0, 1], { clamp: true })
  const p2 = useTransform(progress, [0.28, 0.68], [0, 1], { clamp: true })
  const p3 = useTransform(progress, [0.36, 0.8], [0, 1], { clamp: true })

  // nodes light as their path completes
  const startNodeO = useTransform(progress, [0.18, 0.26], [0.2, 1], { clamp: true })
  const splitNodeO = useTransform(progress, [0.3, 0.4], [0.2, 1], { clamp: true })
  const end1O = useTransform(progress, [0.5, 0.58], [0.15, 1], { clamp: true })
  const end2O = useTransform(progress, [0.62, 0.7], [0.15, 1], { clamp: true })
  const end3O = useTransform(progress, [0.74, 0.82], [0.15, 1], { clamp: true })

  // badge pops last
  const badgeO = useTransform(progress, [0.85, 0.96], [0, 1], { clamp: true })
  const badgeS = useTransform(progress, [0.85, 0.96], [0.7, 1], { clamp: true })

  return (
    <svg
      viewBox="0 0 1200 900"
      role="img"
      aria-label="Helios Protocol banner — a branching storyline path splitting toward multiple endings under a glitching title"
      className="block h-full w-full"
      fontFamily="'JetBrains Mono Variable', ui-monospace, monospace"
    >
      <style>{`
        @keyframes hel-blink { 0%, 100% { opacity: .2 } 50% { opacity: 1 } }
        @keyframes hel-jitter {
          0%, 88%, 100% { transform: translate(0, 0) }
          90% { transform: translate(-5px, 2px) }
          92% { transform: translate(4px, -2px) }
          94% { transform: translate(0, 0) }
        }
        .hel-cursor { animation: hel-blink 1.1s step-end infinite }
        .hel-glitch { transform-box: fill-box; animation: hel-jitter 4.5s steps(1) infinite }
        .hel-badge { transform-box: fill-box; transform-origin: center }
      `}</style>

      <defs>
        <pattern id="hel-scan" width="1200" height="7" patternUnits="userSpaceOnUse">
          <rect width="1200" height="1.5" y="0" fill="rgba(242,240,234,0.035)" />
        </pattern>
      </defs>

      <rect width="1200" height="900" fill="#0B0E0C" />
      <rect width="1200" height="900" fill="url(#hel-scan)" />
      {/* faint horizon grid */}
      <g stroke="rgba(212,255,58,0.07)" strokeWidth="1.5">
        <line x1="0" y1="520" x2="1200" y2="520" />
        <line x1="0" y1="770" x2="1200" y2="770" />
      </g>

      <text x="90" y="130" fill="#8A8A85" fontSize="26" letterSpacing="10">
        YEAR 2093 — CLASSIFIED
        <tspan className="hel-cursor" fill="#D4FF3A">
          _
        </tspan>
      </text>

      {/* title with duotone glitch echo */}
      <motion.g style={{ opacity: titleO, y: titleY }}>
        <g className="hel-glitch">
          <text x="86" y="266" fill="rgba(212,255,58,0.35)" fontSize="96" fontWeight="700" letterSpacing="4">
            HELIOS PROTOCOL
          </text>
        </g>
        <text x="90" y="262" fill="#F2F0EA" fontSize="96" fontWeight="700" letterSpacing="4">
          HELIOS PROTOCOL
        </text>
        <text x="90" y="320" fill="#8A8A85" fontSize="25" letterSpacing="6">
          BRANCHING NARRATIVE · QUICK-TIME EVENTS · MINI-GAMES
        </text>
      </motion.g>

      {/* storyline: trunk splits toward three endings */}
      <g fill="none" stroke="#D4FF3A" strokeWidth="4" strokeLinecap="round">
        <motion.path d="M 140 620 H 460 C 560 620 580 500 690 490 L 950 470" style={{ pathLength: p1 }} />
        <motion.path d="M 460 620 C 590 620 640 620 950 620" style={{ pathLength: p2 }} />
        <motion.path d="M 460 620 C 560 620 580 740 690 750 L 950 770" style={{ pathLength: p3 }} />
      </g>

      {/* nodes + labels */}
      <motion.g style={{ opacity: startNodeO }}>
        <circle cx="140" cy="620" r="16" fill="#D4FF3A" />
        <text x="140" y="672" textAnchor="middle" fill="#8A8A85" fontSize="22" letterSpacing="4">
          START
        </text>
      </motion.g>
      <motion.g style={{ opacity: splitNodeO }}>
        <circle cx="460" cy="620" r="13" fill="none" stroke="#D4FF3A" strokeWidth="4" />
        <text x="460" y="672" textAnchor="middle" fill="#8A8A85" fontSize="22" letterSpacing="4">
          CHOICE
        </text>
      </motion.g>
      <motion.g style={{ opacity: end1O }}>
        <circle cx="950" cy="470" r="12" fill="#F2F0EA" />
        <text x="985" y="478" fill="#8A8A85" fontSize="22" letterSpacing="4">
          ENDING_01
        </text>
      </motion.g>
      <motion.g style={{ opacity: end2O }}>
        <circle cx="950" cy="620" r="12" fill="#F2F0EA" />
        <text x="985" y="628" fill="#8A8A85" fontSize="22" letterSpacing="4">
          ENDING_02
        </text>
      </motion.g>
      <motion.g style={{ opacity: end3O }}>
        <circle cx="950" cy="770" r="12" fill="#F2F0EA" />
        <text x="985" y="778" fill="#8A8A85" fontSize="22" letterSpacing="4">
          ENDING_03
        </text>
      </motion.g>

      {/* 1st place badge */}
      <motion.g className="hel-badge" style={{ opacity: badgeO, scale: badgeS }}>
        <rect x="90" y="400" width="560" height="58" rx="29" fill="#D4FF3A" />
        <text x="370" y="437" textAnchor="middle" fill="#0B0B0B" fontSize="24" fontWeight="700" letterSpacing="2">
          1ST PLACE — PROMPT RACHNA 2.0
        </text>
      </motion.g>
    </svg>
  )
}
