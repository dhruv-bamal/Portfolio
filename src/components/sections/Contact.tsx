import Section from '../ui/Section'
import RevealText from '../ui/RevealText'
import MagneticLink from '../ui/MagneticLink'
import { content } from '../../data/content'

export default function Contact() {
  const { profile, socials } = content

  return (
    <Section id="contact" index={5} title="Contact">
      <div className="flex flex-col items-start gap-12 md:gap-16">
        <RevealText
          as="p"
          className="max-w-3xl font-display text-display-md font-medium leading-tight"
        >
          Have a project in mind, a role to fill, or just want to talk shop?
        </RevealText>

        {/* the one giant CTA */}
        <MagneticLink
          href={`mailto:${profile.email}`}
          strength={0.2}
          className="group font-display text-display-lg font-bold uppercase leading-none"
        >
          <span className="block max-w-full break-all border-b-2 border-line pb-3 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
            Let's talk
          </span>
        </MagneticLink>

        <ul aria-label="Social links" className="flex flex-wrap gap-x-8 gap-y-3">
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
