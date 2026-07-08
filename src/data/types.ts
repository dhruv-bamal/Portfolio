export interface Profile {
  name: string
  role: string
  /** one-line supporting sentence under the hero headline */
  subtitle?: string
  /** items for the marquee ticker bands */
  taglines: string[]
  /** paragraphs for the About section */
  bio: string[]
  location: string
  email: string
  phone?: string
  /** short closing line rendered in the footer */
  motto?: string
  resumeUrl?: string
  /** e.g. "Open to work — Summer 2026" */
  availability?: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface Project {
  /** slug, used as React key */
  id: string
  title: string
  /** 1–2 sentences */
  description: string
  tags: string[]
  /** path under /public, e.g. "/projects/foo.jpg" */
  image: string
  imageAlt: string
  liveUrl?: string
  repoUrl?: string
  year: number
  /** featured projects get the large asymmetric layout */
  featured: boolean
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  /** "YYYY-MM" */
  start: string
  /** "YYYY-MM", or null for present */
  end: string | null
  summary: string
  highlights: string[]
}

export interface SiteContent {
  profile: Profile
  socials: SocialLink[]
  projects: Project[]
  skillGroups: SkillGroup[]
  experience: ExperienceItem[]
}
