<script>
	import { generalStore } from '../stores/stores';
</script>

<nav class="flex py-8 flex-row justify-between items-center">
	<h1 class="text-xl font-bold">{$generalStore.Name} :)</h1>
	<div class="hidden sm:grid gap-6 grid-flow-col uppercase text-sm text-white text-opacity-75">
		<a href="/">Home</a>
		<a href="#releases">releases</a>
		<a href="/register">artists</a>
		<a href="/info">info</a>
		<a href="/contact">contact</a>
		<a href="/portal">portal</a>
	</div>
	<div class="grid sm:hidden">=</div>
</nav>
