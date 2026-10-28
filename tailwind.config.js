/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F3ED',
          50: '#FFFFFF',
          100: '#FAF8F4',
          200: '#F7F3ED',
          300: '#EFE8DE',
          400: '#E5DCCE',
        },
        sand: {
          DEFAULT: '#E8DED1',
          light: '#F2ECE2',
          dark: '#D5C7B5',
        },
        charcoal: {
          DEFAULT: '#20201E',
          soft: '#2D2D2A',
          muted: '#52504C',
          light: '#7A7771',
        },
        gold: {
          DEFAULT: '#B89562',
          light: '#D4AF37',
          dark: '#9A7849',
          champagne: '#C5A880',
          muted: '#8C6F45',
        },
        forest: {
          DEFAULT: '#31443A',
          dark: '#213028',
          light: '#425B4E',
        },
        // LINEUP Palette
        lineup: {
          paper: '#f4f3f0',
          ink: '#151412',
          subtle: '#77736c',
          hairline: '#e3e0da',
          tile: '#d4d3d0',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        instrument: ['"Instrument Serif"', 'Georgia', 'serif'],
        manrope: ['"Manrope"', '"Inter"', 'sans-serif'],
        sans: ['"Manrope"', '"Inter"', 'sans-serif'],
        display: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(32, 32, 30, 0.07)',
        'luxury-hover': '0 30px 60px -12px rgba(32, 32, 30, 0.15)',
        'rack-hanger': '0 25px 35px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'slow-drift': 'drift 35s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
