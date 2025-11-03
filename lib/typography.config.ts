/**
 * Typography Configuration
 *
 * Centralized configuration for fonts and type sizes across the application.
 * Modify this file to update typography settings site-wide.
 */

export const typography = {
  // Font Families
  fonts: {
    body: {
      name: 'ABC Marist Variable',
      path: '../public/fonts/ABCMaristVariable-Trial.woff2',
      sources: [
        {
          path: '../public/fonts/ABCMaristVariable-Trial.woff2',
          weight: '100 900',
          style: 'normal',
        },
        {
          path: '../public/fonts/ABCMaristVariableItalic-Trial.woff2',
          weight: '100 900',
          style: 'italic',
        },
      ],
      variable: '--font-abc-marist',
      fallback: ['sans-serif'],
    },
    heading: {
      name: 'ABC Marist Variable',
      path: '../public/fonts/ABCMaristVariable-Trial.woff2',
      sources: [
        {
          path: '../public/fonts/ABCMaristVariable-Trial.woff2',
          weight: '100 900',
          style: 'normal',
        },
        {
          path: '../public/fonts/ABCMaristVariableItalic-Trial.woff2',
          weight: '100 900',
          style: 'italic',
        },
      ],
      variable: '--font-abc-marist',
      fallback: ['sans-serif'],
    },
    mono: {
      name: 'JetBrains Mono',
      path: '../public/fonts/JetBrainsMono-Medium.woff2',
      sources: [
        {
          path: '../public/fonts/JetBrainsMono-Regular.woff2',
          weight: '400',
          style: 'normal',
        },
        {
          path: '../public/fonts/JetBrainsMono-Medium.woff2',
          weight: '500',
          style: 'normal',
        },
      ],
      variable: '--font-jetbrains-mono',
      fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
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
