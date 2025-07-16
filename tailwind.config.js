/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5F5F5',        // White Smoke
        'secondary': '#E5E7EB',      // Light Gray
        'accent-dark': '#1E293B',    // Dark Charcoal
        'accent-teal': '#0D9488',    // Teal
        'headline': '#111827',       // Charcoal
        'body': '#475569',           // Slate-600
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
