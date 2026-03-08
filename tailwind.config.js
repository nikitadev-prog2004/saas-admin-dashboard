/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ash: '#F8FAFC',       // Cleaner, more modern light grey
          surface: '#FFFFFF',
          slate: '#64748B',     // Sophisticated muted text
          charcoal: '#0F172A',  // Deep professional navy/black
          red: '#E11D48',       // Slightly more vibrant "premium" red
        }
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
