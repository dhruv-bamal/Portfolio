import Marquee from '../ui/Marquee'
import { content } from '../../data/content'

/** Full-bleed ticker between hero and about: skills + availability. */
export default function MarqueeBand() {
  const { profile } = content
  const items = profile.availability
    ? [...profile.taglines, profile.availability]
    : profile.taglines

  return (
    <div aria-label="Highlights" className="border-y border-line py-4 md:py-6">
      <Marquee
        items={items}
        className="px-6 font-display text-2xl uppercase tracking-wide text-fg/90 md:text-4xl"
        duration={26}
      />
    </div>
  )
}
