import Section from '../ui/Section'
import RevealText from '../ui/RevealText'
import MagneticLink from '../ui/MagneticLink'
import { content } from '../../data/content'

export default function Contact() {
  const { profile, socials } = content

  return (
    <Section id="contact" index={4} title="Contact">
      <div className="flex flex-col items-start gap-14 md:gap-20">
        <h3 className="max-w-4xl font-display text-display-lg">
          <RevealText as="span">Let's build</RevealText>{' '}
          <RevealText as="span" className="italic text-accent" delay={0.2}>
            something.
          </RevealText>
        </h3>

        {/* oversized email with underline-draw */}
        <MagneticLink
          href={`mailto:${profile.email}`}
          strength={0.15}
          className="underline-draw max-w-full break-all font-display text-[clamp(1.4rem,4.5vw,4rem)] leading-tight text-fg transition-colors duration-300 hover:text-accent"
        >
          {profile.email}
        </MagneticLink>

        <ul aria-label="Social links" className="flex flex-wrap gap-x-10 gap-y-3">
          {socials.map((social) => (
            <li key={social.label}>
              <MagneticLink
                href={social.url}
                external
                className="label-mono !text-fg/80 transition-colors hover:!text-accent"
              >
                {social.label} ↗
              </MagneticLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
