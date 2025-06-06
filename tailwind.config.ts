import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      base: [
        '14px',
        {
          lineHeight: '22px',
          letterSpacing: '-0.3px',
        },
      ],
      sm: [
        '12px',
        {
          lineHeight: '16px',
          letterSpacing: '-0.3px',
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '28px',
          letterSpacing: '-0.3px',
        },
      ],
      xl: [
        '20px',
        {
          lineHeight: '30px',
          letterSpacing: '-0.3px',
        },
      ],
      '2xl': [
        '24px',
        {
          lineHeight: '36px',
          letterSpacing: '-0.3px',
        },
      ],
    },
  },
  plugins: [typography],
};

export default config;
