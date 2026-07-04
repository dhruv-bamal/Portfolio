import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#121214',
        fg: '#F4F4F0',
        muted: '#8A8A85',
        accent: '#C9F24E',
        line: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 12vw, 11rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
