<script>
	import { page } from '$app/stores'
</script>

<div>
	{#each $$props.routes as route}
		<a class:active={$page.path === route.path} href={route.path}>{route.pathName}</a>
	{/each}
</div>

<style>
	div {
		@apply -mt-1;
		@apply mb-2;
		@apply ml-8;
		@apply opacity-60;
		@apply flex;
		@apply flex-col;
		@apply gap-2;
		@apply text-xs;
	}
	a {
		position: relative;
	}
	a::before {
		@apply items-center;
		content: '';
		position: absolute;
		display: flex;
		left: -1.85rem;
		top: 3px;
		opacity: 0;
		border-radius: 50%;
		@apply bg-teal-200;
		width: 0.65rem;
		height: 0.65rem;

		transition: opacity 0.2s ease-out;
		will-change: opacity;
	}
	a.active::before,
	a:hover::before {
		opacity: 0.5;
	}
	a.active {
		font-weight: bold;
	}
</style>
