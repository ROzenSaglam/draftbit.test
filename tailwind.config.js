const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './global.css',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit_400Regular'],
        'outfit-bold': ['Outfit_700Bold'],
      },
      spacing: {
        global: '24px',
      },
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
        },
        input: {
          DEFAULT: 'hsl(var(--input) / <alpha-value>)',
        },
        ring: {
          DEFAULT: 'hsl(var(--ring) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primaryForeground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondaryForeground) / <alpha-value>)',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary) / <alpha-value>)',
          foreground: 'hsl(var(--tertiaryForeground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructiveForeground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--successForeground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warningForeground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--mutedForeground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accentForeground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popoverForeground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--cardForeground) / <alpha-value>)',
        },
        overlay: {
          DEFAULT: 'hsl(var(--overlay) / <alpha-value>)',
        },
        notification: {
          DEFAULT: 'hsl(var(--notification) / <alpha-value>)',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
