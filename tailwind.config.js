/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./routes/**/*.{tsx,ts}",
    "./islands/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en clases
  theme: {
    extend: {
      backgroundColor: {
        dark: '#1a202c',
      },
      textColor: {
        dark: '#e2e8f0',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(gray|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(gray|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /dark:bg-(gray|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /dark:text-(gray|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
}
