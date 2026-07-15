import type { SiteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to change everything on the site.
// ─────────────────────────────────────────────────────────────────────────────

export const content = {
  profile: {
    name: 'Dhruv Bamal',
    role: 'Full Stack Developer',
    subtitle: 'Building full-stack React + Node.js apps from Ghaziabad, India.',
    taglines: ['TypeScript', 'React 18', 'Next.js', 'Node.js', 'Express', 'PostgreSQL'],
    bio: [
      'I am a final-year Computer Science student with hands-on full-stack development experience — React on the front, Node.js and PostgreSQL behind it — and a consistent problem-solving practice with 100+ LeetCode problems solved.',
      'I have built and deployed production-style web applications with secure authentication and REST APIs, and I am seeking a Software Engineer role where I can apply these skills at scale.',
      'Off the clock I grind DSA in C++, look for open-source projects worth contributing to, and debug with my most trusted rubber duck: console.log.',
    ],
    location: 'Ghaziabad, India',
    email: 'bamaldhruv1105@gmail.com',
    phone: '+91 98105 05413',
    motto: 'Code. Build. Ship. Repeat.',
    availability: 'Open to SWE roles',
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
        'A full-stack expense-tracking app — Next.js/TypeScript frontend over a Node.js/Express REST API with PostgreSQL persistence. Secure JWT authentication with bcrypt hashing and custom middleware enforces per-user data isolation via parameterized SQL queries.',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
      image: '/projects/money-tracker.svg',
      imageAlt:
        'Money Tracker banner — rupee coins dropping onto a filling budget bar with rising expense amounts',
      liveUrl: 'https://money-tracker-next-mu.vercel.app/',
      repoUrl: 'https://github.com/dhruv-bamal/money-tracker-next',
      apiRepoUrl: 'https://github.com/dhruv-bamal/money-tracker-api',
      year: 2026,
      featured: true,
    },
    {
      id: 'helios-protocol',
      title: 'Helios Protocol',
      description:
        'An interactive cyberpunk storytelling app with branching narratives, multiple endings, quick-time events, and story-integrated mini-games driven by user decisions — built within a hackathon timeframe and winner of 1st place at Prompt Rachna 2.0.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
      image: '/projects/helios-protocol.svg',
      imageAlt:
        'Helios Protocol banner — a branching storyline path splitting toward multiple endings under a glitching title',
      liveUrl: 'https://cyber-death.vercel.app/',
      repoUrl: 'https://github.com/dhruv-bamal/cyber-death',
      year: 2026,
      featured: true,
    },
  ],
  skillGroups: [
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'SQL', 'C++', 'Java', 'C', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frontend',
      skills: ['React 18', 'Next.js', 'Component-Based Architecture', 'State Management', 'Responsive UI Design'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'RESTful API Development', 'JWT Authentication', 'bcrypt'],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'Supabase'],
    },
    {
      category: 'Problem Solving',
      skills: ['Data Structures & Algorithms in C++', '100+ LeetCode problems solved'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'Vite', 'Vercel', 'Render', 'CI/CD (GitHub Actions)', 'Thunder Client'],
    },
  ],
  experience: [
    {
      id: 'cognifyz',
      company: 'Cognifyz Technologies (Remote)',
      role: 'Frontend Intern',
      start: '2026-02',
      end: '2026-03',
      summary: 'Built 3 frontend projects as part of a structured internship training program.',
      highlights: [
        'Developed responsive web interfaces using HTML5, CSS3, JavaScript, and Bootstrap.',
        'Integrated REST APIs into frontend applications to display dynamic, real-time data.',
      ],
    },
    {
      id: 'prompt-rachna',
      company: 'Prompt Rachna 2.0 Hackathon',
      role: '1st Position',
      start: '2026-03',
      end: '2026-03',
      summary:
        'Won first place among 100+ participants with Helios Protocol after qualifying through a virtual round.',
      highlights: [],
    },
    {
      id: 'srm-btech',
      company: 'SRM Institute of Science and Technology, Delhi NCR',
      role: 'B.Tech, Computer Science & Engineering',
      start: '2023-05',
      end: null,
      summary:
        'Computer Science and Engineering undergraduate, Class of 2027 (expected) — GPA 7.35/10.',
      highlights: [],
    },
  ],
} satisfies SiteContent
