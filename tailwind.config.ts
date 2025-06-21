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
