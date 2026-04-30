/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7EC3E6',
        'primary-dark': '#4FA3D1',
        'primary-light': '#A9D8F0',
        'primary-50': '#EAF7FC',
        background: '#F8F9FA',
        'card-white': '#FFFFFF',
        'card-green': '#A9D8F0',
        'card-blue': '#D6E9FE',
        'card-peach': '#FFEAE0',
        'card-yellow': '#FFF2CD',
        'card-pink': '#FFDDF4',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 8px 24px rgba(149, 157, 165, 0.15)',
        'card-hover': '0 12px 32px rgba(149, 157, 165, 0.25)',
        'elevated': '0 16px 40px rgba(0, 0, 0, 0.12)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
