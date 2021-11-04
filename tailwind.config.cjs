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

			},
			gridTemplateColumns: {
				'min-auto': "min-content auto;",
				'1fr-auto': "1fr auto"
			}

		}


	},
	variants: {
		extend: {},
	},
	plugins: [],
};
