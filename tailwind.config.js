/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        founders: ['FoundersGrotesk', 'sans-serif'],
        montreal: ['NeueMontreal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

