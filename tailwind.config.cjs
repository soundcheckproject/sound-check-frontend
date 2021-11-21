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
				pending:colors.orange["500"],
				accepted:colors.purple["500"],
				denied:colors.red["500"],
				released:colors.purple["500"],

			},
			gridTemplateColumns: {
				'min-auto': "min-content auto;",
				'1fr-auto': "1fr auto",
				'150-auto-fr': "150px auto 1fr",
				'150-fr': "150px 1fr",
			}

		}


	},
	variants: {
		extend: {},
	},
	plugins: [],
};
