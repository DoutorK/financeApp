/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e7f6f0',
          100: '#cfece0',
          200: '#a7dbc6',
          300: '#74c8a7',
          400: '#2FBF8E',
          500: '#1D9E75',
          700: '#0f6e56',
          900: '#085041',
        },
        error: {
          50: '#faece7',
          100: '#f6d7cc',
          300: '#ef8b66',
          400: '#D85A30',
          900: '#993C1D',
        },
        surface: '#f8f9ff',
        'surface-container': '#ffffff',
        'surface-container-high': '#f3f5fb',
        outline: '#d6d9e3',
        'outline-variant': '#e7e9f0',
        text: '#1c1b1f',
        'text-variant': '#49454f',
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,27,31,0.06), 0 1px 3px rgba(28,27,31,0.08)',
        elevated: '0 10px 24px rgba(28,27,31,0.12), 0 2px 6px rgba(28,27,31,0.08)',
        'fab-lg': '0 8px 18px rgba(29, 158, 117, 0.24), 0 3px 6px rgba(29, 158, 117, 0.18)',
      },
      borderRadius: {
        'xl-2': '1.5rem',
        'xl-3': '1.75rem',
      },
    },
  },
  plugins: [],
}
