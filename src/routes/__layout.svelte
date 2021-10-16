<div class="c-app">
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
	@import url('../assets/fonts/gotham/style.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.c-app {
		@apply font-roboto;
		@apply bg-gray-50;
		@apply w-screen;
		@apply h-screen;
	}
</style>
