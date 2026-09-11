/**
 * Typography Configuration
 *
 * Centralized configuration for fonts and type sizes across the application.
 * Modify this file to update typography settings site-wide.
 */

// Inter is loaded via next/font/google in app/layout.tsx, which exposes it on
// the `--font-inter` CSS variable. It is the single UI font for body text,
// headings, and blog content.
const inter = {
  name: 'Inter',
  variable: '--font-inter',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
} as const;

export const typography = {
  // Font Families
  fonts: {
    body: inter,
    heading: inter,
  },

  // Type Scale
  sizes: {
    xs: {
      fontSize: '12px',
      lineHeight: '18px',
    },
    sm: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    base: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    md: {
      fontSize: '15px',
      lineHeight: '22px',
    },
    lg: {
      fontSize: '17px',
      lineHeight: '26px',
    },
    xl: {
      fontSize: '20px',
      lineHeight: '30px',
    },
    '2xl': {
      fontSize: '24px',
      lineHeight: '36px',
    },
  },

  // Base HTML font size
  htmlFontSize: '14px',
  htmlLineHeight: '20px',
} as const;

export type TypographyConfig = typeof typography;
