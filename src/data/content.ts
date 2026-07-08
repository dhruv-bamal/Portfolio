import type { SiteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to change everything on the site.
// ─────────────────────────────────────────────────────────────────────────────

export const content = {
  profile: {
    name: 'Dhruv Bamal',
    role: 'Junior Full Stack Developer',
    subtitle: 'Building production React + TypeScript apps from Ghaziabad, India.',
    taglines: ['TypeScript', 'React 18', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
    bio: [
      'I am a Computer Science undergraduate (B.Tech, 2027) and hackathon-winning developer seeking a full-stack development internship or entry-level role.',
      'I have built and shipped a production React + TypeScript frontend alongside a secure Node.js/Express REST API with JWT authentication and PostgreSQL — covering the stack end to end.',
      'I am proficient in TypeScript, JavaScript, SQL, and modern web tooling, with a track record of independently designing, building, and deploying complete applications.',
      'Off the clock I grind DSA in C++, look for open-source projects worth contributing to, and debug with my most trusted rubber duck: console.log.',
    ],
    location: 'Ghaziabad, India',
    email: 'bamaldhruv1105@gmail.com',
    phone: '+91 98105 05413',
    motto: 'Code. Build. Ship. Repeat.',
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
        'A typed React 18 app of 8 reusable components over a framework-independent business-logic layer — auto-categorization engine, recurring-subscription detection, and budget-limit alerts, fully decoupled from the UI and shipped to Vercel via GitHub-triggered CI/CD.',
      tags: ['React 18', 'TypeScript', 'Vite', 'CSS Modules', 'Vercel'],
      image: '/projects/money-tracker.svg',
      imageAlt:
        'Animated Money Tracker banner — bouncing rupee coins dropping onto a rising budget bar',
      liveUrl: 'https://money-tracker-drab-tau.vercel.app/',
      repoUrl: 'https://github.com/dhruv-bamal/money-tracker',
      year: 2026,
      featured: true,
    },
    {
      id: 'money-tracker-api',
      title: 'Money Tracker API',
      description:
        'A RESTful API with parameterized CRUD queries, a normalized relational schema with foreign-key constraints, and JOIN/GROUP BY aggregation for multi-user financial data — JWT auth with bcrypt hashing enforcing per-user access over PostgreSQL via Supabase.',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Render'],
      image: '/projects/money-tracker-api.svg',
      imageAlt:
        'Animated Money Tracker API banner — a request pulsing from client to server to database and returning 200 OK',
      liveUrl: 'https://money-tracker-api-funr.onrender.com',
      repoUrl: 'https://github.com/dhruv-bamal/money-tracker-api',
      year: 2026,
      featured: true,
    },
  ],
  skillGroups: [
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Java (Basics)', 'C (Basics)', 'C++'],
    },
    {
      category: 'Frontend',
      skills: ['React 18', 'Component & State Architecture', 'CSS Modules', 'Responsive UI Design'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST API Design', 'JWT Authentication', 'bcrypt', 'node-postgres'],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'Supabase'],
    },
    {
      category: 'Data Structures & Algorithms',
      skills: ['Problem-solving in C++'],
    },
    {
      category: 'Tools & Deployment',
      skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Vercel', 'Render', 'CI/CD', 'Thunder Client'],
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
      highlights: [],
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
        'Built a secure Node.js/Express REST API with JWT auth and PostgreSQL, covering the stack end to end.',
      ],
    },
  ],
} satisfies SiteContent
