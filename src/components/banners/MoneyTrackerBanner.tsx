import { useEffect, useRef } from 'react'
import { motion, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'

interface BannerProps {
  /** 0→1 scroll-beat progress (constant 1 under reduced motion) */
  progress: MotionValue<number>
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Money Tracker banner — hybrid motion graphics.
 * Idle: coins bob on a CSS loop. Scroll beats: coins drop in, expense
 * amounts rise, the budget bar fills to 43% and the counter counts up.
 */
export default function MoneyTrackerBanner({ progress }: BannerProps) {
  const counterRef = useRef<SVGTextElement>(null)

  // budget bar fills across the middle of the scroll window
  const barScaleX = useTransform(progress, [0.15, 0.8], [0, 1], { clamp: true })

  // coins drop in with stagger
  const coin1Y = useTransform(progress, [0.0, 0.3], [-380, 0], { clamp: true })
  const coin2Y = useTransform(progress, [0.08, 0.38], [-420, 0], { clamp: true })
  const coin3Y = useTransform(progress, [0.16, 0.46], [-460, 0], { clamp: true })
  const coin1O = useTransform(progress, [0.02, 0.18], [0, 1], { clamp: true })
  const coin2O = useTransform(progress, [0.1, 0.26], [0, 1], { clamp: true })
  const coin3O = useTransform(progress, [0.18, 0.34], [0, 1], { clamp: true })

  // expense amounts rise and settle in staggered windows
  const a1O = useTransform(progress, [0.35, 0.5], [0, 1], { clamp: true })
  const a2O = useTransform(progress, [0.45, 0.6], [0, 1], { clamp: true })
  const a3O = useTransform(progress, [0.55, 0.7], [0, 1], { clamp: true })
  const a1Y = useTransform(progress, [0.35, 0.55], [46, 0], { clamp: true })
  const a2Y = useTransform(progress, [0.45, 0.65], [46, 0], { clamp: true })
  const a3Y = useTransform(progress, [0.55, 0.75], [46, 0], { clamp: true })

  const writeCounter = (v: number) => {
    if (!counterRef.current) return
    const t = clamp01((v - 0.15) / 0.65)
    counterRef.current.textContent = `${Math.round(t * 43)}% USED`
  }
  useMotionValueEvent(progress, 'change', writeCounter)
  useEffect(() => {
    writeCounter(progress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  return (
    <svg
      viewBox="0 0 1200 900"
      role="img"
      aria-label="Money Tracker banner — rupee coins dropping onto a filling budget bar with rising expense amounts"
      className="block h-full w-full"
      fontFamily="'JetBrains Mono Variable', ui-monospace, monospace"
    >
      <style>{`
        @keyframes mtb-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-26px) } }
        .mtb-coin { transform-box: fill-box; transform-origin: center; animation: mtb-bob 2.4s ease-in-out infinite }
        .mtb-c2 { animation-delay: .4s } .mtb-c3 { animation-delay: .8s }
        .mtb-fill { transform-box: fill-box; transform-origin: left center }
      `}</style>

      <rect width="1200" height="900" fill="#141414" />
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="2">
        <line x1="0" y1="225" x2="1200" y2="225" />
        <line x1="0" y1="450" x2="1200" y2="450" />
        <line x1="0" y1="675" x2="1200" y2="675" />
        <line x1="300" y1="0" x2="300" y2="900" />
        <line x1="600" y1="0" x2="600" y2="900" />
        <line x1="900" y1="0" x2="900" y2="900" />
      </g>

      <text x="90" y="150" fill="#8A8A85" fontSize="30" letterSpacing="8">
        MONTHLY BUDGET
      </text>
      <text x="90" y="242" fill="#F2F0EA" fontSize="92" fontWeight="700">
        ₹4,296
      </text>
      <text x="90" y="298" fill="#D4FF3A" fontSize="30" letterSpacing="2">
        Remaining ₹5,704
      </text>

      {/* coins: scroll drop-in wraps the CSS bob loop */}
      <motion.g style={{ y: coin1Y, opacity: coin1O }}>
        <g className="mtb-coin">
          <circle cx="850" cy="255" r="62" fill="#D4FF3A" />
          <text x="850" y="282" textAnchor="middle" fill="#0B0B0B" fontSize="72" fontWeight="700">
            ₹
          </text>
        </g>
      </motion.g>
      <motion.g style={{ y: coin2Y, opacity: coin2O }}>
        <g className="mtb-coin mtb-c2">
          <circle cx="985" cy="320" r="46" fill="#F2F0EA" />
          <text x="985" y="342" textAnchor="middle" fill="#0B0B0B" fontSize="54" fontWeight="700">
            ₹
          </text>
        </g>
      </motion.g>
      <motion.g style={{ y: coin3Y, opacity: coin3O }}>
        <g className="mtb-coin mtb-c3">
          <circle cx="1090" cy="245" r="52" fill="#D4FF3A" />
          <text x="1090" y="269" textAnchor="middle" fill="#0B0B0B" fontSize="60" fontWeight="700">
            ₹
          </text>
        </g>
      </motion.g>

      {/* expense amounts rise on scroll */}
      <g fill="#D4FF3A" fontSize="34" fontWeight="700">
        <motion.text x="785" y="530" style={{ opacity: a1O, y: a1Y }}>
          +₹250
        </motion.text>
        <motion.text x="1075" y="505" style={{ opacity: a2O, y: a2Y }}>
          +₹99
        </motion.text>
        <motion.text x="930" y="550" style={{ opacity: a3O, y: a3Y }}>
          +₹450
        </motion.text>
      </g>

      {/* budget bar scrubs with scroll */}
      <rect x="90" y="700" width="1020" height="42" rx="21" fill="rgba(255,255,255,0.08)" />
      <motion.rect
        className="mtb-fill"
        x="90"
        y="700"
        width="439"
        height="42"
        rx="21"
        fill="#D4FF3A"
        style={{ scaleX: barScaleX }}
      />
      <text ref={counterRef} x="90" y="792" fill="#8A8A85" fontSize="28" letterSpacing="4">
        0% USED
      </text>
    </svg>
  )
}
