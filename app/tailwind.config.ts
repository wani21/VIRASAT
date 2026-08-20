import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Heritage Color Palette ───────────────────────────────────────────
      // 70% neutrals (parchment/cream/brown), 20% dark, 10% accent
      colors: {
        // Neutrals — 70% of usage
        parchment: {
          50:  '#fdfbf4',
          100: '#faf5e4',  // Warm Cream
          200: '#f5ecd0',  // Parchment
          300: '#ecdcb4',
          400: '#e0c990',
          500: '#d4b870',
          DEFAULT: '#f5ecd0',
        },
        sandstone: {
          100: '#f0e6d3',
          200: '#e8d5b7',
          300: '#d9c09a',
          400: '#c9a87c',  // Sandstone
          500: '#b8956a',
          DEFAULT: '#c9a87c',
        },
        stone: {
          100: '#e8e4df',
          200: '#d5cfc8',
          300: '#b5aca0',
          400: '#8c8070',  // Stone Grey
          500: '#6e6458',
          DEFAULT: '#8c8070',
        },

        // Darks — 20% of usage
        walnut: {
          600: '#5c3d28',
          700: '#4a3728',  // Dark Walnut
          800: '#3d2b1f',  // Deep Brown
          900: '#2e1e15',
          DEFAULT: '#4a3728',
        },
        charcoal: {
          700: '#3a3a3a',
          800: '#2c2c2c',  // Charcoal
          900: '#1a1a1a',
          DEFAULT: '#2c2c2c',
        },

        // Accents — 10% of usage
        bronze: {
          400: '#c4a03a',
          500: '#8b6914',  // Antique Bronze
          600: '#6e5210',
          DEFAULT: '#8b6914',
        },
        terracotta: {
          400: '#d97b4a',
          500: '#c2622d',  // Terracotta
          600: '#a04e23',
          DEFAULT: '#c2622d',
        },
        maroon: {
          600: '#8a2626',
          700: '#6b1e1e',  // Deep Maroon
          800: '#4f1515',
          DEFAULT: '#6b1e1e',
        },

        // Semantic aliases
        heritage: {
          bg:        '#faf5e4',   // page background
          surface:   '#f5ecd0',   // card surfaces
          border:    '#d9c09a',   // borders / dividers
          text:      '#3d2b1f',   // primary text
          muted:     '#8c8070',   // muted text
          accent:    '#8b6914',   // bronze accent
          highlight: '#c2622d',   // terracotta highlight
          dark:      '#2c2c2c',   // dark text
        },
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        // Headings — editorial/historical
        display:    ['var(--font-cormorant)', 'Georgia', 'serif'],
        heading:    ['var(--font-playfair)', 'Georgia', 'serif'],
        monument:   ['var(--font-cinzel)', 'Georgia', 'serif'],
        // Body — clean and readable
        body:       ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        ui:         ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        sans:       ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.75rem, 6vw, 5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)',{ lineHeight: '1.2',  letterSpacing: '-0.005em' }],
        'label-sm':   ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'label-md':   ['0.75rem',   { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'label-lg':   ['0.875rem',  { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        'museum': '2px',      // almost square — museum/exhibition feel
        'arch':   '999px 999px 0 0', // arch shape for cards
      },

      // ─── Shadows ───────────────────────────────────────────────────────────
      boxShadow: {
        'heritage-sm':  '0 1px 4px rgba(61, 43, 31, 0.08)',
        'heritage':     '0 2px 12px rgba(61, 43, 31, 0.12), 0 1px 3px rgba(61, 43, 31, 0.06)',
        'heritage-md':  '0 4px 20px rgba(61, 43, 31, 0.14), 0 2px 6px rgba(61, 43, 31, 0.08)',
        'heritage-lg':  '0 8px 40px rgba(61, 43, 31, 0.18), 0 4px 12px rgba(61, 43, 31, 0.10)',
        'museum-frame': '0 0 0 1px rgba(139, 105, 20, 0.3), 0 4px 24px rgba(61, 43, 31, 0.15)',
        'inset-soft':   'inset 0 1px 3px rgba(61, 43, 31, 0.06)',
      },

      // ─── Animations ────────────────────────────────────────────────────────
      animation: {
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'fade-in':     'fadeIn 0.6s ease-out forwards',
        'reveal-text': 'revealText 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-pan':    'slowPan 25s ease-in-out infinite alternate',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
        'marker-ping': 'markerPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        revealText: {
          '0%':   { opacity: '0', transform: 'translateY(16px) skewY(1deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) skewY(0deg)' },
        },
        slowPan: {
          '0%':   { transform: 'scale(1.05) translateX(-1%)' },
          '100%': { transform: 'scale(1.12) translateX(1%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        markerPing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },

      // ─── Transitions ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        'heritage': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },

      // ─── Background Images ─────────────────────────────────────────────────
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        'heritage-gradient': 'linear-gradient(160deg, #faf5e4 0%, #f5ecd0 50%, #ecdcb4 100%)',
        'dark-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(61, 43, 31, 0.6) 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(61,43,31,0.35) 0%, rgba(61,43,31,0.1) 40%, rgba(61,43,31,0.7) 100%)',
      },

      // ─── Backdrop Blur ─────────────────────────────────────────────────────
      backdropBlur: {
        'xs': '2px',
      },

      // ─── Screens ───────────────────────────────────────────────────────────
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

export default config
