<div class="font-roboto c-app">
	<slot />
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
	@import url('../assets/fonts/gotham/style.css');
	@import url('../assets/style/style.css');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.c-app {
		/* background: red; */
		/* @apply bg-gray-50; */
	}
</style>
