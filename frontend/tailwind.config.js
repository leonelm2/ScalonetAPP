/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scaloneta: {
          bg: '#0b0f19',
          card: '#161f30',
          cardLight: '#1e2b42',
          border: '#2a3b5c',
          accent: '#10b981', // Verde brillante césped
          celeste: '#38bdf8', // Celeste de la Selección
          oro: '#eab308', // Dorado copa
          danger: '#ef4444',
          textMuted: '#94a3b8',
        }
      },
      fontFamily: {
        sports: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
