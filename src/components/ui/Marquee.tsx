import clsx from 'clsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface MarqueeProps {
  items: string[]
  className?: string
  /** seconds for one full loop */
  duration?: number
  reverse?: boolean
}

function Track({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden ? 'true' : undefined}
      className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14"
    >
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 md:gap-14">
          {item}
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * Infinite horizontal ticker. Pure CSS keyframe loop (no JS per frame),
 * pauses on hover. The duplicate copy is aria-hidden; under reduced
 * motion it renders as a static wrapped list instead.
 */
export default function Marquee({ items, className, duration = 30, reverse = false }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={clsx('flex flex-wrap items-center gap-x-8 gap-y-2', className)}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            {i < items.length - 1 && (
              <span aria-hidden="true" className="text-accent">
                ✦
              </span>
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={clsx('group flex overflow-hidden whitespace-nowrap', className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          ['--marquee-duration' as string]: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <Track items={items} />
        <Track items={items} hidden />
      </div>
    </div>
  )
}
