<script>
	import { generalStore } from '../stores/stores';
</script>

<nav class="flex py-8 flex-row justify-between items-center">
	<a href="/"> <h1 class="text-xl font-bold">{$generalStore.Name} :)</h1></a>
	<div
		class="hidden sm:grid text-xs lg:text-sm gap-2 sm:gap-6 lg:gap-10 grid-flow-col uppercase text-white text-opacity-75"
	>
		<a href="/">Home</a>
		<a href="#releases">releases</a>
		<a href="/register">artists</a>
		<a href="/info">info</a>
		<a href="/contact">contact</a>
		<a href="/login">portal</a>
	</div>
	<div class="grid sm:hidden">=</div>
</nav>

<style>
	a {
		@apply transition-all;
	}
	a:hover {
		text-shadow: 1px 0 rgba(255, 255, 255, 0.75);
	}
</style>
