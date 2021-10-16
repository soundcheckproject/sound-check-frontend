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
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
