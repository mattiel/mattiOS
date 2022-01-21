const { spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h2, h3': {
              'scroll-margin-top': spacing[24],
            },
            hr: {
              borderColor: 'transparent',
              height: '1px',
              borderWidth: 0,
              background: `linear-gradient(to right, ${theme('colors.gray.50')}, ${theme('colors.transparent')})`,
            }
          }
        },
        xl: {
          css: {
            'h2, h3 > a': {
              fontWeight: 700,
            },
            'h2': {
              fontSize: '1.25em'
            },
            'h3': {
              fontSize: '1em'
            },
            p: {
              fontSize: '1em'
            },
          }
        },
        dark: {
          hr: {
            background: `linear-gradient(to right, ${theme('colors.gray.900')}, ${theme('colors.transparent')})`,
          }
        }
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
}