import type Lenis from 'lenis'
import type { MouseEvent } from 'react'
import MagneticLink from '../ui/MagneticLink'
import { content } from '../../data/content'

interface FooterProps {
  lenis: Lenis | null
}

export default function Footer({ lenis }: FooterProps) {
  const { profile } = content

  const backToTop = (e: MouseEvent) => {
    if (!lenis) return
    e.preventDefault()
    lenis.scrollTo(0)
  }

  return (
    <footer className="border-t border-line">
      <div className="label-mono mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8 md:px-10 lg:px-16">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        {profile.motto && <p className="!text-accent">{profile.motto}</p>}
        <p>{profile.location}</p>
        {profile.phone && (
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-accent">
            {profile.phone}
          </a>
        )}
        <MagneticLink href="#top" className="label-mono !text-fg/80 hover:!text-accent" onClick={backToTop}>
          Back to top ↑
        </MagneticLink>
      </div>
    </footer>
  )
}
