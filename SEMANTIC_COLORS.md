# Semantic Color System

This project now uses semantic color classes instead of specific color values. This makes styling more intuitive and maintainable.

## Available Semantic Colors

### Text Colors

- `text-primary` - Main text color (#282A30 in light mode, #F7F8F8 in dark mode)
- `text-primary-inverse` - Inverse primary text (#F7F8F8 in light mode, #282A30 in dark mode)
- `text-secondary` - Secondary text color (#6F6E77 in light mode, #8A8F98 in dark mode)
- `text-tertiary` - Tertiary text color (#8F8F8F in light mode, #62666D in dark mode)
- `text-muted` - Muted text color (zinc-400 in light mode, zinc-500 in dark mode)

### Background Colors

- `bg-primary` - Main background color (#FFFFFF in light mode, #08090A in dark mode)
- `bg-primary-inverse` - Inverse primary background (#08090A in light mode, #FFFFFF in dark mode)
- `bg-secondary` - Secondary background color (#F9F8F9 in light mode, #1C1C1F in dark mode)
- `bg-tertiary` - Tertiary background color (#F4F2F4 in light mode, #232326 in dark mode)

### Border Colors

- `border-primary` - Primary border color (#E9E8EA in light mode, #23252A in dark mode)
- `border-secondary` - Secondary border color (zinc-200 in light mode, zinc-600 in dark mode)
- `border-muted` - Muted border color (zinc-100 in light mode, zinc-500 in dark mode)

## Usage Examples

### Before (using specific colors)

```jsx
<h1 className="text-zinc-900 dark:text-zinc-100">Title</h1>
<p className="text-zinc-600 dark:text-zinc-400">Description</p>
<div className="bg-zinc-50/40 dark:bg-zinc-950/40">Container</div>
<a className="border-zinc-400 dark:border-zinc-600">Link</a>
```

### After (using semantic colors)

```jsx
<h1 className="text-primary">Title</h1>
<p className="text-secondary">Description</p>
<div className="bg-secondary/40">Container</div>
<a className="border-muted">Link</a>
```

## Benefits

1. **More Intuitive**: `text-secondary` is clearer than remembering specific hex values
2. **Easier Maintenance**: Change colors in one place (CSS custom properties)
3. **Consistent**: Ensures consistent color usage across the app
4. **Dark Mode Ready**: Automatically handles dark mode transitions
5. **Shorter Classes**: No need for long conditional classes
6. **Custom Palette**: Uses a custom color palette designed for optimal contrast and readability

## Implementation

The semantic colors are implemented using CSS custom properties in `app/globals.css`. The colors automatically adapt to light/dark mode based on the `.dark` class.

## Migration

To migrate existing components:

1. Replace `text-zinc-900 dark:text-zinc-100` with `text-primary`
2. Replace `text-zinc-600 dark:text-zinc-400` with `text-secondary`
3. Replace `text-zinc-400 dark:text-zinc-500` with `text-muted`
4. Replace `bg-white dark:bg-zinc-950` with `bg-primary`
5. Replace `border-zinc-300 dark:border-zinc-700` with `border-primary`

## Color Palette

This project uses a custom color palette based on the Figma design system, providing:

- Clean, neutral tones with subtle warmth
- Excellent contrast and readability
- Modern, professional appearance
- Consistent dark mode support
