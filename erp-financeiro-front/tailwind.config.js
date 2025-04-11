/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1f6650',
          'primary-dark': '#1a5643',
          secondary: '#1f6650',
          accent: '#4895ef',
          text: '#2b2d42',
          'text-light': '#8d99ae',
          background: '#f8f9fa',
          error: '#ef233c',
          success: '#4cc9f0',
        },
        borderRadius: {
          DEFAULT: '8px',
        },
        boxShadow: {
          DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [],
  }