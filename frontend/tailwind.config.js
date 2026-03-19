/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#0D1B2A',
        maroon:  '#8B1A1A',
        orange:  '#D4820A',
        green:   '#1E6B45',
        bgray:   '#F4F4F4',
        body:    '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
