<script>
	import { generalStore } from '../stores/stores'
	import Button from './Button.svelte'
	import SubTitle from './SubTitle.svelte'
	import Title from './Title.svelte'
</script>

<nav class="flex py-8 flex-row justify-between items-center">
	<a href="/"> <h1 class="text-xl font-bold">{$generalStore.Name} :)</h1></a>
	<div
		class="hidden sm:grid text-xs lg:text-sm gap-2 sm:gap-6 lg:gap-10 grid-flow-col  text-white text-opacity-75"
	>
		<a href="/">Home</a>
		<a href="#releases">releases</a>
		<a href="/register">artists</a>
		<a href="/info">info</a>
		<a href="/contact">contact</a>
		<div class="relative group">
			<a href="/login">portal </a>
		</div>
		<div class="grid sm:hidden">=</div>
	</div>
</nav>

<style>
	a {
		@apply transition-all;
		@apply uppercase;
	}
	a:hover {
		text-shadow: 1px 0 rgba(255, 255, 255, 0.75);
	}
</style>
