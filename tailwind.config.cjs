// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        gotham: ['Gotham', 'sans-serif'],
      },

      colors: {
        gray: colors.blueGray,
        teal: colors.teal,
        pending: colors.orange['500'],
        accepted: colors.purple['500'],
        denied: colors.red['500'],
        released: colors.purple['500'],
      },
      gridTemplateColumns: {
        'min-auto': 'min-content auto;',
        '1fr-auto': '1fr auto',
        '150-auto-fr': '150px auto 1fr',
        '150-fr': '150px 1fr',
        'repeat-min-64': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },
      gridTemplateRows: {
        'min-64': 'minmax(16rem, 1fr)',
      },
      translate: {
        'screen-w': '100vw',
        'screen-h': '100vh',
      },
      minWidth: {
        xs: '20rem',
      },
      minHeight: {
        xs: '20rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
