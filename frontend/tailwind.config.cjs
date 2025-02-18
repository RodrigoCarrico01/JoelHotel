/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Certifique-se de que o Tailwind vê o arquivo HTML
    "./src/**/*.{js,jsx,ts,tsx}", // Garante que o Tailwind veja todos os arquivos React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
