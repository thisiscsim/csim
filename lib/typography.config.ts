/**
 * Typography Configuration
 *
 * Centralized configuration for fonts and type sizes across the application.
 * Modify this file to update typography settings site-wide.
 */

const twkGhost = {
  name: 'TWK Ghost',
  path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-Regular.woff2',
  sources: [
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'https://csim.b-cdn.net/Fonts/TWKGhost/TWKGhost-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-twk-ghost',
  fallback: ['Georgia', 'serif'],
} as const;

export const typography = {
  // Font Families
  fonts: {
    body: twkGhost,
    heading: twkGhost,
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
