/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Certifique-se de que o Tailwind vê o arquivo HTML
    "./src/**/*.{js,jsx,ts,tsx}", // Garante que o Tailwind veja todos os arquivos React
  ],
  theme: {
    extend: {
      colors: {
        color1: '#eff3cd',
        color2: '#b2d5ba',
        color3: '#61ada0',
        color4: '#248f8d',
        color5: '#605063',
        color6: '#ffffff',
      },
    },
  },
  plugins: [],
}