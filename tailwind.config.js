/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'terminal': ['Fira Code', 'monospace'], // Custom terminal font
      },
      colors: {
        'terminal-green': '#4AF626'
      },
    },
  },
  plugins: [],
}