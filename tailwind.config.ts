import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0B',
        surface: '#141414',
        fg: '#F2F0EA',
        muted: '#8A8A85',
        accent: '#D4FF3A',
        line: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Inter Tight Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.2rem, 12vw, 11rem)', { lineHeight: '0.95', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2.6rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.8rem, 4vw, 3.6rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        bloom: {
          '0%, 100%': { transform: 'translate(-10%, -6%) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(6%, 4%) scale(1.15)', opacity: '0.75' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
        bloom: 'bloom 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
