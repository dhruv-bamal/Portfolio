import type { SiteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to change everything on the site.
// ─────────────────────────────────────────────────────────────────────────────

export const content = {
  profile: {
    name: 'Dhruv Bamal',
    role: 'Junior Full Stack Developer',
    subtitle: 'Building production React + TypeScript apps from Ghaziabad, India.',
    taglines: ['TypeScript', 'React 18', 'Node.js', 'Express', 'Vite', 'SQL'],
    bio: [
      'I am a Computer Science undergraduate (B.Tech, 2027) and hackathon-winning developer who ships real software — most recently a production React + TypeScript web application with a clean, API-ready architecture.',
      'I work across the stack: TypeScript and React on the front, Node.js, Express, and SQL behind it. I care about typed component hierarchies and logic layers that stay decoupled from the UI, so the code is ready to grow.',
      'Right now I am looking for a full-stack development internship where I can contribute to a real engineering team while deepening my backend skills alongside strong frontend fundamentals.',
    ],
    location: 'Ghaziabad, India',
    email: 'bamaldhruv1105@gmail.com',
    phone: '+91 98105 05413',
    availability: 'Available for internships',
  },
  socials: [
    { label: 'GitHub', url: 'https://github.com/dhruv-bamal' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/dhruv-bamal' },
  ],
  projects: [
    {
      id: 'money-tracker',
      title: 'Money Tracker',
      description:
        'An expense tracker with auto-categorization, recurring-subscription detection, and budget-limit alerts — built on a typed component hierarchy with the logic layer fully decoupled from the UI for future Node.js API integration.',
      tags: ['React 18', 'TypeScript', 'Vite', 'CSS Modules', 'Vercel'],
      image: '/projects/money-tracker.png',
      imageAlt:
        'Money Tracker dashboard showing monthly budget usage, spending by category, and detected subscriptions',
      liveUrl: 'https://money-tracker-drab-tau.vercel.app/',
      repoUrl: 'https://github.com/dhruv-bamal/money-tracker',
      year: 2026,
      featured: true,
    },
    {
      id: 'cyber-death',
      title: 'Cyber Death',
      description:
        'A browser-based interactive storytelling game in vanilla JavaScript — branching narrative logic, timed decisions, and multiple outcome paths in a custom cyberpunk UI with audio and CSS animations, shipped dependency-free.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
      image: '/projects/cyber-death.jpg',
      imageAlt:
        'Cyber Death title screen — Helios Protocol, a cyberpunk story where an AI controls every system on Earth',
      liveUrl: 'https://cyber-death.vercel.app/',
      repoUrl: 'https://github.com/dhruv-bamal/cyber-death',
      year: 2026,
      featured: true,
    },
  ],
  skillGroups: [
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'SQL', 'Java', 'C++', 'C', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frontend',
      skills: ['React 18', 'CSS Modules', 'Component & State Architecture', 'Responsive UI'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'REST APIs'],
    },
    {
      category: 'Tools & Deployment',
      skills: ['Vite', 'Git & GitHub', 'Vercel', 'CI/CD'],
    },
  ],
  experience: [
    {
      id: 'csi-hackathon',
      company: 'CSI Hackathon (TechStacy)',
      role: '1st Position',
      start: '2026-03',
      end: '2026-03',
      summary:
        'Won first place in an off-campus hackathon competition among 100+ participants across 50+ teams.',
      highlights: [
        'Multiple branching storylines with unique endings',
        'Interactive decision-making and time-sensitive quick-time events',
        'Story-integrated mini-games that directly impact outcomes',
        'Custom-designed cyberpunk-inspired UI/UX',
        'Dynamic gameplay where every choice matters',
      ],
    },
    {
      id: 'srm-btech',
      company: 'SRM Institute of Science and Technology, Delhi NCR',
      role: 'B.Tech, Computer Science & Engineering',
      start: '2023-05',
      end: null,
      summary: 'Computer Science and Engineering undergraduate, Class of 2027 (expected) — CGPA 7.35.',
      highlights: [
        'Designed and shipped a production React + TypeScript web application alongside coursework.',
        'Comfortable across the stack with JavaScript, Node.js/Express, and SQL.',
      ],
    },
  ],
} satisfies SiteContent
