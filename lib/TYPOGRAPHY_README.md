# Typography Configuration Guide

This project uses a centralized typography configuration system that makes it easy to update fonts and text sizes across the entire application.

## Configuration File

All typography settings are defined in `/lib/typography.config.ts`.

## How to Change Font Sizes

Edit the `sizes` object in `typography.config.ts`:

```typescript
sizes: {
  xs: {
    fontSize: '12px',    // Change this value
    lineHeight: '18px',  // And this line height
  },
  sm: {
    fontSize: '13px',
    lineHeight: '20px',
  },
  base: {
    fontSize: '13px',    // Base font size (same as sm)
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
  // ... more sizes
}
```

Changes will automatically propagate to:

- Tailwind utility classes (`text-xs`, `text-sm`, `text-md`, etc.)
- The base HTML font size (uses `base` size)
- All components using these classes

## How to Change Fonts

### Option 1: Swap an Existing Font

Edit the font configuration in `typography.config.ts`:

```typescript
fonts: {
  heading: {
    name: 'Your New Font',           // Font name
    path: '../public/fonts/YourFont.woff2',  // Path to font file
    sources: [                         // Font variations
      {
        path: '../public/fonts/YourFont-Regular.woff2',
        weight: '400',
        style: 'normal',
      },
      // Add more variations as needed
    ],
    variable: '--font-heading',        // CSS variable name
    fallback: ['serif'],               // Fallback fonts
  },
}
```

Then update `app/layout.tsx` to load the new font:

```typescript
const yourFont = localFont({
  src: typography.fonts.heading.sources, // Uses config
  variable: typography.fonts.heading.variable,
  display: 'swap',
  preload: true,
  fallback: typography.fonts.heading.fallback,
});
```

### Option 2: Add New Font from Google Fonts

1. Update `typography.config.ts`:

```typescript
fonts: {
  body: {
    name: 'Inter',
    path: 'next/font/google',  // Google Font
    import: 'Inter',
    variable: '--font-inter',
    fallback: ['sans-serif'],
  },
}
```

2. Update `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: typography.fonts.body.variable,
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
```

## Current Typography Scale

| Class                   | Font Size | Line Height | Usage                  |
| ----------------------- | --------- | ----------- | ---------------------- |
| `text-xs`               | 12px      | 18px        | Small labels, captions |
| `text-sm` / `text-base` | 13px      | 20px        | Body text, base size   |
| `text-md`               | 15px      | 22px        | Emphasized body text   |
| `text-lg`               | 17px      | 26px        | Subheadings            |
| `text-xl`               | 20px      | 30px        | Section headings       |
| `text-2xl`              | 24px      | 36px        | Page titles            |

## After Making Changes

1. Stop the dev server
2. Clear Next.js cache: `rm -rf .next`
3. Restart the dev server: `npm run dev`

This ensures all Tailwind classes are regenerated with your new values.
