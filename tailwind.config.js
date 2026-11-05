/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff0f3',
          100: '#ffe0e9',
          200: '#ffc0d3',
          300: '#ff91b2',
          400: '#ff5a8a',
          500: '#ff2d6b',
          600: '#f0084f',
          700: '#cc0040',
          800: '#a8003a',
          900: '#8c0036',
        },
        rose: {
          dust: '#c4869c',
          blush: '#e8b4c0',
          champagne: '#f5e6d3',
          ivory: '#fdf8f2',
          mauve: '#9e7b8c',
          gold: '#d4a574',
          burgundy: '#7c2d44',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'butterfly': 'butterfly 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        butterfly: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(30px, -40px) rotate(15deg)' },
          '50%': { transform: 'translate(60px, 0px) rotate(-10deg)' },
          '75%': { transform: 'translate(30px, 40px) rotate(5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
      },
      backgroundImage: {
        'blush-gradient': 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f5e6d3 50%, #fef3c7 75%, #fff1f2 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #fff7ed 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #7c2d44 0%, #9e3357 50%, #be4a6a 100%)',
      },
    },
  },
  plugins: [],
}
