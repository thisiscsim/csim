import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import { typography } from './lib/typography.config';

const config: Config = {
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
        accent: {
          red: '#C03540',
        },
        primary: 'rgb(var(--bg-primary))',
        'primary-inverse': 'rgb(var(--bg-primary-inverse))',
        secondary: 'rgb(var(--bg-secondary))',
        tertiary: 'rgb(var(--bg-tertiary))',
        text: {
          primary: 'rgb(var(--text-primary))',
          'primary-inverse': 'rgb(var(--text-primary-inverse))',
          secondary: 'rgb(var(--text-secondary))',
          tertiary: 'rgb(var(--text-tertiary))',
          muted: 'rgb(var(--text-muted))',
        },
        border: {
          primary: 'rgb(var(--border-primary))',
          secondary: 'rgb(var(--border-secondary))',
          muted: 'rgb(var(--border-muted))',
        },
      },
    },
  },
  plugins: [typographyPlugin],
};

export default config;
