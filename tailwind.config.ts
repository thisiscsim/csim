import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import { typography } from './lib/typography.config';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(${typography.fonts.body.variable})`, ...typography.fonts.body.fallback],
        mono: [`var(${typography.fonts.mono.variable})`, ...typography.fonts.mono.fallback],
      },
      fontSize: Object.entries(typography.sizes).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: [value.fontSize, { lineHeight: value.lineHeight }],
        }),
        {}
      ),
      colors: {
        // Design tokens only - no Tailwind default colors
        'bg-base': 'var(--bg-base)',
        'fg-base': 'var(--fg-base)',
        'fg-subtle': 'var(--fg-subtle)',
        'fg-muted': 'var(--fg-muted)',
        'border-base': 'var(--border-base)',
        'interactive-base': 'var(--interactive-base)',
      },
    },
  },
  plugins: [typographyPlugin],
};

export default config;
