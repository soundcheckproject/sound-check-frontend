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
		},
		extend: {
			colors: {
				gray: colors.blueGray,
				teal: colors.teal,
				alpha: {}
			}
		},


	},
	variants: {
		extend: {},
	},
	plugins: [],
};
