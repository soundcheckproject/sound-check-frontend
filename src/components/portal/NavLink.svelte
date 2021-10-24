<!-- src/lib/components/NavLink.svelte -->
<script>
	import { page } from '$app/stores'
	$: isActive = $page.path === $$props.href
	export let sublink = false
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a {...$$props} class:active={isActive}>
	<slot />
	<p class="ml-4">{$$props.name}</p>
	{#if sublink}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	{/if}
</a>

<style>
	svg {
		@apply text-teal-300;
	}
	a {
		@apply flex;

		@apply items-center;
		@apply text-white;
		@apply text-opacity-90;
	}
	a p {
		position: relative;

		@apply items-center;
		@apply gap-1;
		@apply transition-opacity;
	}
	svg {
		@apply text-gray-100;
		@apply opacity-50;
		@apply ml-2;
		@apply mt-1;
		@apply -rotate-90;

		@apply transition-all;
	}
	a:hover svg,
	a.active:hover svg {
		@apply rotate-0;
		@apply opacity-100;
	}

	a p:hover {
		opacity: 0.6;
	}

	a p::before {
		content: '';
		position: absolute;
		bottom: -4px;

		height: 2px;

		opacity: 0;
		border-radius: 1px;

		@apply bg-white;
		width: 25%;

		transition: width 0.2s ease-out, opacity 0.2s ease-out;
		will-change: width, opacity;
	}
	a p:hover::before,
	a.active p::before {
		width: 100%;
		opacity: 0.6;
	}
</style>
