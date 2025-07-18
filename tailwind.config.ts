import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-berkeley-mono)', 'monospace'],
      },
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
    fontSize: {
      xs: [
        '10px',
        {
          lineHeight: '14px',
        },
      ],
      base: [
        '14px',
        {
          lineHeight: '22px',
        },
      ],
      sm: [
        '12px',
        {
          lineHeight: '16px',
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '28px',
        },
      ],
      xl: [
        '20px',
        {
          lineHeight: '30px',
        },
      ],
      '2xl': [
        '24px',
        {
          lineHeight: '36px',
        },
      ],
    },
  },
  plugins: [typography],
};

export default config;
